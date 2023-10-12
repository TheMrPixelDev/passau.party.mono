import { useContext, useEffect } from 'react';
import { EventDAO } from '../../../shared/dataTypes';
import { EventContext, SavedEventContext } from '../data/contexts';
import { hostname } from '../data/request';

async function fetchAllEvents() {
    const events = await (await fetch(`${hostname}/events`)).json();
    return events as EventDAO[];
}

export const QueryProvider = () => {
    const { setEvents } = useContext(EventContext);
    const { setSavedEvents } = useContext(SavedEventContext);

    useEffect(() => {
        fetchAllEvents().then((events) => {
            setEvents(events);
        });
        const savedEventsFromLocalStorage = localStorage.getItem('savedEvents');
        if (savedEventsFromLocalStorage !== null) {
            const parsedEvents = JSON.parse(savedEventsFromLocalStorage) as EventDAO[];
            setSavedEvents(parsedEvents);
        }
    }, []);

    return <></>;
};
