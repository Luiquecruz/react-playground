import {notFound} from 'next/navigation';
import Image from 'next/image';
import BookEvent from '@/components/BookEvent';
import {getSimilarEventsBySlug} from '@/lib/actions/event.actions';
import {IEvent} from '@/database';
import Card from '@/components/Card';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const EventDetailItem = ({icon, alt, label}: { icon: string, alt: string, label: string }) => (
  <div className="event-detail-item flex gap-4 items-center">
    <Image src={icon} alt={alt} width={17} height={17}/>
    <p>{label}</p>
  </div>
);

const EventAgenda = ({agendaItems}: { agendaItems: string[] }) => (
  <div className="agenda">
    <h3>Agenda</h3>
    <ul>
      {agendaItems.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  </div>
);

const EventTags = ({tags}: { tags: string[] }) => (
  <div className="tags flex gap-1.5">
    {tags.map((tag, index) => (
      <span key={index} className="pill">{tag}</span>
    ))}
  </div>
);

const EventDetailsPage = async ({params}: { params: Promise<{ slug: string }> }) => {
  const {slug} = await params;
  const request = await fetch(`${BASE_URL}/api/events/${slug}`);
  const {event} = await request.json();

  if (!event) return notFound();

  const bookings = 10;

  const similarEvents: IEvent[] = await getSimilarEventsBySlug(slug);

  return (
    <article id="event">
      <header className="header">
        <h1>{event.title}</h1>
        <p>{event.description}</p>
      </header>

      <div className="details">
        <div className="content">
          <figure>
            <Image src={event.image} alt={event.title} width={800} height={800} className="banner"/>
            <figcaption className="sr-only">{event.title}</figcaption>
          </figure>

          <section className="flex-col-gap-2">
            <h2>Overview</h2>
            <p>{event.overview}</p>
          </section>

          <section className="flex-col-gap-2">
            <h2>Event Details</h2>

            <EventDetailItem icon="/icons/calendar.svg" alt="calendar" label={event.date.replaceAll('-', '/')}/>
            <EventDetailItem icon="/icons/clock.svg" alt="clock" label={event.time}/>
            <EventDetailItem icon="/icons/pin.svg" alt="pin" label={event.location}/>
            <EventDetailItem icon="/icons/mode.svg" alt="mode" label={event.mode}/>
            <EventDetailItem icon="/icons/audience.svg" alt="audience" label={event.audience}/>
          </section>

          <section className="flex-col-gap-2">
            <EventAgenda agendaItems={event.agenda}/>
          </section>

          <section className="flex-col-gap-2">
            <h2>About the Organizer</h2>
            <p>{event.organizer}</p>
          </section>

          <section>
            <EventTags tags={event.tags}/>
          </section>
        </div>

        <aside className="booking">
          <div className="signup-card">
            <h2>Book Your Spot</h2>

            {bookings > 0 ? (
              <small className="text-sm">
                Join {bookings} people who have already booked their spot.
              </small>
            ) : (
              <small className="text-sm">
                Be the first to book your spot!
              </small>
            )}

            <BookEvent/>
          </div>
        </aside>
      </div>

      {similarEvents.length > 0 && (
        <div className="flex w-full flex-col gap-4 pt-20">
          <h2>Similar Events</h2>

          <div className="events">
            {similarEvents.map((similarEvent: IEvent) => (
              <Card
                key={similarEvent._id as string}
                image={similarEvent.image}
                title={similarEvent.title}
                location={similarEvent.location}
                date={similarEvent.date}
                time={similarEvent.time}
                slug={similarEvent.slug}
              />
            ))}
          </div>
        </div>
      )}
    </article>
  );
};

export default EventDetailsPage;