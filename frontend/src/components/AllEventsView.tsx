import { SimpleGrid } from '@chakra-ui/react';
import { EventCard } from './EventCard';
import { useContext } from 'react';
import { EventContext, SavedEventContext } from '../data/contexts';

export const AllEventsView = () => {
    const { events } = useContext(EventContext);
    const { savedEvents } = useContext(SavedEventContext);

    console.log(events);

    return (
        <SimpleGrid columns={[1, null, 3]} spacing={5} maxWidth={'100%'}>
            {Array.isArray(events)
                ? events.map((event, eventIdx) => {
                      const isSavedEvent = savedEvents.some((savedEvent) => savedEvent.id == event.id);
                      return <EventCard isSavedEvent={isSavedEvent} event={event} key={`event-${eventIdx}`} />;
                  })
                : null}
        </SimpleGrid>
    );
};
