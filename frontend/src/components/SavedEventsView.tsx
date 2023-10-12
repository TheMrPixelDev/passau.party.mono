import { SimpleGrid } from '@chakra-ui/react';
import { EventCard } from './EventCard';
import { useContext } from 'react';
import { SavedEventContext } from '../data/contexts';

export const SavedEventsView = () => {
    const { savedEvents } = useContext(SavedEventContext);

    
    return (
        <SimpleGrid columns={[1, null, 3]} spacing={5} maxWidth={'100%'}>
            {savedEvents.map((event, eventIdx) => (
                <EventCard isSavedEvent={true} event={event} key={`event-${eventIdx}`} />
            ))}
        </SimpleGrid>
    );
};
