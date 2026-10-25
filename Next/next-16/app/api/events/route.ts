import {NextRequest, NextResponse} from 'next/server';
import {v2 as cloudinary} from 'cloudinary';
import connectDB from '@/lib/mongodb';
import Event from '@/database/event.model';

// Define required fields (excluding MongoDB auto-generated fields)
const REQUIRED_FIELDS = [
  'title',
  'description',
  'overview',
  'venue',
  'location',
  'date',
  'time',
  'mode',
  'audience',
  'organizer',
] as const;

/**
 * Validates event data before processing
 * Excludes MongoDB auto-generated fields: _id, createdAt, updatedAt, __v
 */
function validateEventData(event: Record<string, unknown>): {
  isValid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  // Check required fields
  for (const field of REQUIRED_FIELDS) {
    if (!event[field] || typeof event[field] !== 'string' || (event[field] as string).trim() === '') {
      errors.push(`Missing or invalid required field: ${field}`);
    }
  }

  // Validate slug format (alphanumeric, hyphens, underscores only)
  if (event.slug && typeof event.slug === 'string') {
    const slugRegex = /^[a-zA-Z0-9_-]+$/;
    if (!slugRegex.test(event.slug)) {
      errors.push('Slug can only contain letters, numbers, hyphens, and underscores');
    }
  }

  // Validate date format (YYYY-MM-DD)
  if (event.date && typeof event.date === 'string') {
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(event.date)) {
      errors.push('Date must be in YYYY-MM-DD format');
    }
  }

  // Validate time format (HH:MM)
  if (event.time && typeof event.time === 'string') {
    const timeRegex = /^\d{2}:\d{2}$/;
    if (!timeRegex.test(event.time)) {
      errors.push('Time must be in HH:MM format');
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

/**
 * Validates image file
 */
function validateImageFile(file: File): { isValid: boolean; error?: string } {
  // Check file size (max 5MB)
  const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
  if (file.size > MAX_FILE_SIZE) {
    return { isValid: false, error: 'Image file size must be less than 5MB' };
  }

  // Check file type
  const ALLOWED_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
  if (!ALLOWED_TYPES.includes(file.type)) {
    return {
      isValid: false,
      error: 'Invalid image type. Only JPEG, PNG, and WebP are allowed',
    };
  }

  return { isValid: true };
}

/**
 * Parses JSON string field to array
 * Handles both JSON strings and already-parsed arrays
 */
function parseArrayField(field: unknown): string[] | null {
  if (!field) return null;

  // If already an array, return it
  if (Array.isArray(field)) {
    return field.filter((item) => typeof item === 'string' && item.trim() !== '');
  }

  // If string, try to parse as JSON
  if (typeof field === 'string') {
    try {
      const parsed = JSON.parse(field);
      if (Array.isArray(parsed)) {
        return parsed.filter((item) => typeof item === 'string' && item.trim() !== '');
      }
    } catch (e) {
      // If JSON parsing fails, treat as comma-separated string
      return field.split(',').map((item) => item.trim()).filter(Boolean);
    }
  }

  return null;
}

export async function POST(req: NextRequest) {
  try {
    // Connect to database first
    await connectDB();

    // Parse form data
    const formData = await req.formData();
    let event: Record<string, unknown>;

    try {
      event = Object.fromEntries(formData.entries());
    } catch (e) {
      return NextResponse.json(
        { message: 'Invalid form data format' },
        { status: 400 }
      );
    }

    // Get image file
    const file = formData.get('image') as File | null;

    if (!file) {
      return NextResponse.json(
        { message: 'Image file is required' },
        { status: 400 }
      );
    }

    // Validate image file BEFORE uploading
    const imageValidation = validateImageFile(file);
    if (!imageValidation.isValid) {
      return NextResponse.json(
        { message: imageValidation.error },
        { status: 400 }
      );
    }

    // Validate event data BEFORE uploading image
    const validation = validateEventData(event);
    if (!validation.isValid) {
      return NextResponse.json(
        {
          message: 'Event validation failed',
          errors: validation.errors,
        },
        { status: 400 }
      );
    }

    // Check for duplicate slug BEFORE uploading image
    const existingEvent = await Event.findOne({ slug: event.slug });
    if (existingEvent) {
      return NextResponse.json(
        { message: `Event with slug '${event.slug}' already exists` },
        { status: 409 }
      );
    }

    // Parse agenda from JSON string to array (if provided)
    let agenda = JSON.parse(formData.get('agenda') as string);

    // Parse tags from JSON string to array (if provided)
    let tags = JSON.parse(formData.get('tags') as string);

    // Now upload image (only after all validations pass)
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const uploadResult = await new Promise<{ secure_url: string; public_id: string }>(
      (resolve, reject) => {
        cloudinary.uploader.upload_stream(
          {
            resource_type: 'image',
            folder: 'dev-whatever',
          },
          (error, results) => {
            if (error) return reject(error);
            resolve(results as { secure_url: string; public_id: string });
          }
        ).end(buffer);
      }
    );

    event.image = uploadResult.secure_url;

    // Create event in database (MongoDB auto-generates: _id, createdAt, updatedAt, __v)
    const createdEvent = await Event.create({
      ...event,
      agenda: agenda,
      tags: tags,
    });

    return NextResponse.json(
      {
        message: 'Event created successfully',
        event: createdEvent,
      },
      { status: 201 }
    );
  } catch (e) {
    // Log error for debugging
    if (process.env.NODE_ENV === 'development') {
      console.error('Error creating event:', e);
    }

    // Handle specific errors
    if (e instanceof Error) {
      // Handle Mongoose validation errors
      if (e.name === 'ValidationError') {
        return NextResponse.json(
          {
            message: 'Event validation failed',
            error: e.message,
          },
          { status: 400 }
        );
      }

      // Handle duplicate key errors
      if (e.message.includes('duplicate key')) {
        return NextResponse.json(
          { message: 'Event with this slug already exists' },
          { status: 409 }
        );
      }
    }

    return NextResponse.json(
      {
        message: 'Event creation failed',
        error: e instanceof Error ? e.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await connectDB();

    const events = await Event.find().sort({ createdAt: -1 });

    return NextResponse.json(
      { message: 'Events fetched successfully', events },
      { status: 200 }
    );
  } catch (e) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Error fetching events:', e);
    }

    return NextResponse.json(
      {
        message: 'Event fetching failed',
        error: e instanceof Error ? e.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}