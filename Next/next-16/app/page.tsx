import ExploreButton from '@/components/ExploreButton';
import Card from '@/components/Card';
import {IEvent} from '@/database';
import {cacheLife} from 'next/cache';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const Page = async () => {
  'use cache';
  cacheLife('hours')

  const response = await fetch(`${BASE_URL}/api/events`);
  const {events} = await response.json();

  return (
    <section>
      <h1 className="text-center">The hub for <br/> Devs and Families!</h1>
      <p className="text-center mt-5">Burnouts, Melatonin and more!</p>
      <ExploreButton/>

      <div className="mt-20 space-y-7">
        <h3>Featured Events</h3>

        <ul className="events">
          {events && events.length > 0 && events.map((event: IEvent) => (
            <li key={event.slug} className="list-none">
              <Card
                slug={event.slug}
                image={event.image}
                title={event.title}
                location={event.location}
                date={event.date}
                time={event.time}
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Page;