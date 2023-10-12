import {
    CardHeader,
    Card,
    CardBody,
    CardFooter,
    Heading,
    Text,
    Icon,
    IconButton,
    Spacer,
    ButtonGroup,
    useToast,
} from '@chakra-ui/react';
import { EventDAO } from '../../../shared/dataTypes';
import { EventDetailsModal } from './EventDetailsModal';
import { StarIcon, CheckIcon, DeleteIcon } from '@chakra-ui/icons';
import { useContext } from 'react';
import { SavedEventContext } from '../data/contexts';

export type Props = {
    event: EventDAO;
    isSavedEvent: boolean;
};

export const EventCard = (props: Props) => {
    const {
        event: { location, title, summary },
        isSavedEvent,
    } = props;

    const toast = useToast();
    const { savedEvents, setSavedEvents } = useContext(SavedEventContext);

    const toggleSavedEvent = () => {
        if (savedEvents.some((event) => event.id === props.event.id)) {
            const newSavedEvents = savedEvents.filter((event) => event.id != props.event.id);
            setSavedEvents(newSavedEvents);
            localStorage.setItem('savedEvents', JSON.stringify(newSavedEvents));
            toast({
                colorScheme: 'yellow',
                position: 'top',
                description: 'Event wurde aus deine Favoriten entfernt.',
                variant: 'subtle',
                icon: <DeleteIcon />,
            });
        } else {
            setSavedEvents([...savedEvents, props.event]);
            localStorage.setItem('savedEvents', JSON.stringify([...savedEvents, props.event]));
            toast({
                colorScheme: 'green',
                position: 'top',
                description: 'Event wurde in deinen Favoriten gespeichert.',
                variant: 'subtle',
                icon: <CheckIcon />,
            });
        }
    };

    return (
        <Card>
            <CardHeader>
                <Heading size={'md'}>{title}</Heading>
            </CardHeader>
            <CardBody>
                <Text size="md">{summary}</Text>
                <br />
                <Text size="xs">{location ?? 'Ort ist noch nicht bekannt...'}</Text>
            </CardBody>
            <CardFooter width={'100%'}>
                <ButtonGroup>
                    <EventDetailsModal event={props.event} />
                    <Spacer />
                    <IconButton
                        onClick={toggleSavedEvent}
                        aria-label="start-icon"
                        bgColor={isSavedEvent ? 'yellowgreen' : undefined}
                    >
                        <Icon as={StarIcon} />
                    </IconButton>
                </ButtonGroup>
            </CardFooter>
        </Card>
    );
};
