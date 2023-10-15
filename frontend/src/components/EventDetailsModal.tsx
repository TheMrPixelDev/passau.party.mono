import {
    Button,
    FormControl,
    FormLabel,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Text,
    useDisclosure,
} from '@chakra-ui/react';
import { EventDAO } from '../../../shared/dataTypes';

export type Props = {
    event: EventDAO;
};

const months = [
    'Januar',
    'Februar',
    'März',
    'April',
    'Mai',
    'Juni',
    'Juli',
    'August',
    'September',
    'Oktober',
    'November',
    'Dezember',
];

export const EventDetailsModal = (props: Props) => {
    const {
        event: { description, title, datetime, location },
    } = props;
    const { isOpen, onOpen, onClose } = useDisclosure();

    const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    const datetimeObj = new Date(datetime * 1000);

    const splitDescription = description.split('||');

    const year = datetimeObj.getFullYear();
    const month = datetimeObj.getMonth();
    const day = datetimeObj.getDay();
    const hours = datetimeObj.getHours();
    const minute = datetimeObj.getMinutes();

    const datetimeString = `${day}. ${months[month]} ${year} um ${hours}:${minute}`;

    return (
        <>
            <Button width={'10rem'} colorScheme="purple" onClick={onOpen}>
                Mehr erfahren
            </Button>
            <Modal isOpen={isOpen} onClose={onClose} size={isMobileDevice ? 'full' : '4xl'}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>{title}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Text as={'b'}>Beschreibung</Text>
                        <br />
                        {splitDescription.map((text) => {
                            return <Text size="sm">{text}</Text>;
                        })}
                        <br />
                        <FormControl>
                            <FormLabel fontWeight={'bold'}>Datum und Uhrzeit</FormLabel>
                            <Input variant={'filled'} value={datetimeString} disabled></Input>
                        </FormControl>
                        <br />
                        <FormControl>
                            <FormLabel fontWeight={'bold'}>Veranstaltungsort</FormLabel>
                            <Input variant={'filled'} disabled value={location}></Input>
                        </FormControl>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="red" mr={3} onClick={onClose}>
                            Schließen
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};
