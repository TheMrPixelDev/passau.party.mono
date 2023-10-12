import {
    AlertIcon,
    Button,
    Container,
    FormControl,
    FormErrorMessage,
    FormLabel,
    HStack,
    Input,
    Text,
    Textarea,
    useToast,
} from '@chakra-ui/react';
import { EventDTO } from '../../../shared/dataTypes';
import { useContext, useState } from 'react';
import { EventContext } from '../data/contexts';
import { ArrowUpIcon, WarningIcon } from '@chakra-ui/icons';
import { hostname } from '../data/request';

export type Props = {
    onSuccess: () => void;
};

export type EventFormErrors = {
    title?: boolean;
    description?: boolean;
    location?: boolean;
    rating?: boolean;
    summary?: boolean;
    datetime?: boolean;
};

const generateEmptyEvent = (): EventDTO => {
    const unixTime = Math.floor(Date.now() / 1000);
    return {
        title: '',
        description: '',
        datetime: unixTime,
        location: '',
        rating: 0,
        summary: '',
    };
};

export const AddEventForm = (props: Props) => {
    const { onSuccess } = props;
    const [errors, setErrors] = useState<EventFormErrors>({});
    const [formEvent, setFormEvent] = useState<EventDTO>(generateEmptyEvent());
    const toast = useToast();
    const { setEvents } = useContext(EventContext);

    const validateForm = (event: EventDTO): EventFormErrors => {
        return {
            title: event.title !== undefined && event.title.length === 0,
            description: event.description !== undefined && event.description.length === 0,
            location: event.location !== undefined && event.location.length === 0,
        };
    };

    const handleChange = (event: any) => {
        const value = event.target.value;
        const name = event.target.name as string;
        const tempFormEvent = Object.defineProperty(formEvent, name, {
            value,
            writable: true,
        });
        // Object must be cloned due to reference issues
        setErrors(validateForm({ ...tempFormEvent }));
        setFormEvent({ ...tempFormEvent });
    };

    const send = () => {
        if (Object.entries(errors).some((error) => error ?? false)) {
            fetch(`${hostname}/events`, {
                method: 'POST',
                body: JSON.stringify(formEvent),
                headers: { 'content-type': 'application/json' },
            }).then(async (res) => {
                if (res.ok) {
                    const evs = await res.json();
                    setEvents(evs);
                    onSuccess();
                    toast({
                        colorScheme: 'green',
                        duration: 200,
                        description: 'Event wurde erfolgreich abgeschickt.',
                        icon: <ArrowUpIcon />,
                        position: 'top',
                    });
                } else {
                    toast({
                        colorScheme: 'red',
                        description: 'Beim senden des Events an den Server ist ein Fehler aufgetreten.',
                        icon: <AlertIcon />,
                        position: 'top',
                    });
                }
            });
        } else {
            toast({
                colorScheme: 'red',
                description: 'Deine Eingaben sind noch fehlerhaft.',
                icon: <WarningIcon />,
                position: 'top',
            });
        }
    };

    return (
        <Container>
            <FormControl>
                <FormLabel>Titel</FormLabel>
                <Input
                    isInvalid={errors?.title}
                    isRequired
                    value={formEvent.title}
                    name="title"
                    onChange={handleChange}
                    variant={'filled'}
                    type="text"
                />
                {errors?.title ? <FormErrorMessage>* Pflichtfeld</FormErrorMessage> : null}
            </FormControl>
            <FormControl marginTop={5}>
                <FormLabel>Beschreibung</FormLabel>
                <Textarea
                    isInvalid={errors?.description}
                    isRequired
                    value={formEvent.description}
                    name="description"
                    onChange={handleChange}
                    variant={'filled'}
                />
                {errors?.description ? <FormErrorMessage>* Pflichtfeld</FormErrorMessage> : null}
            </FormControl>
            <FormControl marginTop={5}>
                <FormLabel>Kurzbeschreibung</FormLabel>
                <Textarea value={formEvent.summary} name="summary" onChange={handleChange} variant={'filled'} />
            </FormControl>
            <FormControl marginTop={5}>
                <FormLabel>Ort</FormLabel>
                <Input
                    isRequired
                    isInvalid={errors?.location}
                    value={formEvent.location}
                    name="location"
                    onChange={handleChange}
                    variant={'filled'}
                    type="text"
                />
                {errors?.location ? <FormErrorMessage>* Pflichtfeld</FormErrorMessage> : null}
            </FormControl>
            <Text fontSize={'sm'} marginTop={3}>
                Beachte, dass dein Event vor der Veröffentlichung noch von einem Administrator gesichtet wird.
            </Text>
            <HStack spacing={'1rem'} marginTop={3}>
                <Button colorScheme="green" onClick={send}>
                    Senden
                </Button>
                <Button
                    onClick={() => {
                        setFormEvent(generateEmptyEvent());
                        onSuccess();
                    }}
                >
                    Verwerfen
                </Button>
            </HStack>
        </Container>
    );
};
