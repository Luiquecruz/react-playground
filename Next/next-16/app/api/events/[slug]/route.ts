import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Event, { IEvent } from '@/database/event.model';

type RouteParams = {
  params: Promise<{
    slug: string;
  }>;
};

type ErrorResponse = {
  message: string;
  error?: string;
};

type SuccessResponse = {
  message: string;
  event: IEvent;
};

/**
 * GET /api/events/[slug]
 * Fetches a single event by its slug
 */
export async function GET(
  req: NextRequest,
  { params }: RouteParams
): Promise<NextResponse<ErrorResponse | SuccessResponse>> {
  try {
    await connectDB();

    const { slug } = await params;

    if (!slug || slug.trim() === '') {
      return NextResponse.json<ErrorResponse>(
        {
          message: 'Invalid or missing slug parameter',
          error: 'Slug must be a non-empty string',
        },
        { status: 400 }
      );
    }

    const sanitizedSlug = slug.trim().toLowerCase();

    // Validate slug format (alphanumeric, hyphens, underscores only)
    const slugRegex = /^[a-zA-Z0-9_-]+$/;
    if (!slugRegex.test(sanitizedSlug)) {
      return NextResponse.json<ErrorResponse>(
        {
          message: 'Invalid slug format',
          error: 'Slug can only contain letters, numbers, hyphens, and underscores',
        },
        { status: 400 }
      );
    }

    // Query event by slug
    const event = await Event.findOne({ slug: sanitizedSlug }).lean<IEvent>();

    // Handle event not found
    if (!event) {
      return NextResponse.json<ErrorResponse>(
        {
          message: 'Event not found',
          error: `No event exists with slug: ${sanitizedSlug}`,
        },
        { status: 404 }
      );
    }

    // Return successful response
    return NextResponse.json<SuccessResponse>(
      {
        message: 'Event fetched successfully',
        event,
      },
      { status: 200 }
    );
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Error fetching event by slug:', error);
    }

    if (error instanceof Error) {
      // Handle database configuration errors
      if (error.message.includes('MONGODB_URI')) {
        return NextResponse.json<ErrorResponse>(
          { message: 'Database configuration error' },
          { status: 500 }
        );
      }

      return NextResponse.json<ErrorResponse>(
        {
          message: 'Failed to fetch event',
          error: error.message,
        },
        { status: 500 }
      );
    }

    return NextResponse.json<ErrorResponse>(
      { message: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}