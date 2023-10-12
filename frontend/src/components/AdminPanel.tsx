import {
    AlertIcon,
    Card,
    CardBody,
    Text,
    Container,
    VStack,
    useToast,
    IconButton,
    Flex,
    HStack,
    Button,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { EventDAO } from '../../../shared/dataTypes';
import { DeleteIcon, RepeatIcon, ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { EventDetailsModal } from './EventDetailsModal';
import { Credentials } from '../types/uiTypes';
import { hostname } from '../data/request';

export type Props = {
    credentials: Credentials;
};

export const AdminPanel = (props: Props) => {
    const { credentials } = props;
    const [events, setEvents] = useState<EventDAO[]>([]);
    const [fetchingEvents, setFetchingEvents] = useState<boolean>(false);
    const toast = useToast();

    useEffect(() => {
        loadEvents();
    }, []);

    const loadEvents = () => {
        setFetchingEvents(true);
        fetch(`${hostname}/events?safe=both`, {
            headers: {
                Authorization: `Basic ${btoa(credentials.username + ':' + credentials.password)}`,
            },
        }).then((res) => {
            if (res.ok) {
                setFetchingEvents(false);
                res.json().then((fetchedEvents) => setEvents(fetchedEvents));
            } else {
                setFetchingEvents(false);
                toast({
                    colorScheme: 'red',
                    icon: <AlertIcon />,
                    description: 'Beim laden der Events vom Server ist ein Fehler aufgetreten.',
                    position: 'top',
                    variant: 'subtle',
                });
            }
        });
    };

    const deleteEvent = (id: string) => {
        fetch(`${hostname}/events/${id}`, {
            method: 'DELETE',
            headers: { Authorization: `Basic ${btoa(credentials.username + ':' + credentials.password)}` },
        }).then((res) => {
            if (res.ok) {
                loadEvents();
            } else {
                toast({
                    colorScheme: 'red',
                    icon: <AlertIcon />,
                    description: 'Beim Löschen des Events vom Server ist ein Fehler aufgetreten.',
                    position: 'top',
                    variant: 'subtle',
                });
            }
        });
    };

    const setEventSafety = (eventId: string, safe: boolean) => {
        fetch(`${hostname}/events/${eventId}/${safe ? 'setSafe' : 'setUnsafe'}`, {
            method: 'PUT',
            headers: {
                Authorization: `Basic ${btoa(credentials.username + ':' + credentials.password)}`,
            },
        }).then((res) => {
            if (res.ok) {
                loadEvents();
            } else {
                toast({
                    colorScheme: 'red',
                    description: 'Beim updated des Safety-Statuses ist ein Fehler beim Server aufgetreten.',
                    icon: <AlertIcon />,
                    position: 'top',
                });
            }
        });
    };

    return (
        <Container marginTop={4} maxWidth={'800px'}>
            <Flex justifyContent={'center'} margin={5}>
                <Button onClick={loadEvents} colorScheme="cyan" isLoading={fetchingEvents}>
                    <RepeatIcon />
                    <Text>Neu laden</Text>
                </Button>
            </Flex>
            <VStack>
                {events.map((event, eventIdx) => {
                    return (
                        <Card width={'100%'} key={`event-${eventIdx}`}>
                            <CardBody>
                                <Flex justifyContent={'space-between'} alignItems={'center'}>
                                    <Text fontSize={'large'}>{event.title}</Text>

                                    <HStack spacing={5}>
                                        <EventDetailsModal event={event} />

                                        <IconButton
                                            aria-label="allow-event-button"
                                            icon={<ViewIcon />}
                                            onClick={() => setEventSafety(event.id, true)}
                                            colorScheme={event.safe ? 'green' : undefined}
                                        />
                                        <IconButton
                                            aria-label="disallow-event-button"
                                            icon={<ViewOffIcon />}
                                            onClick={() => setEventSafety(event.id, false)}
                                            colorScheme={!event.safe ? 'red' : undefined}
                                        />
                                        <IconButton
                                            aria-label="delete-event-button"
                                            icon={<DeleteIcon />}
                                            colorScheme="red"
                                            onClick={() => deleteEvent(event.id)}
                                        />
                                    </HStack>
                                </Flex>
                            </CardBody>
                        </Card>
                    );
                })}
            </VStack>
        </Container>
    );
};
