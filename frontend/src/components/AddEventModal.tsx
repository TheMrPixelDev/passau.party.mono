import { AddIcon } from '@chakra-ui/icons';
import {
    Button,
    Modal,
    ModalBody,
    ModalCloseButton,
    Text,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    useDisclosure,
    Box,
} from '@chakra-ui/react';
import { AddEventForm } from './AddEventForm';

export const AddEventModal = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    return (
        <>
            <Button
                aria-label="addEventButton"
                onClick={onOpen}
                colorScheme="orange"
                display={'flex'}
                alignItems={'center'}
            >
                <Box marginRight={2}>
                    <AddIcon />
                </Box>
                <Text>Event hinzufügen</Text>
            </Button>

            <Modal size={isMobileDevice ? 'full' : 'xl'} isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Event hinzufügen</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody></ModalBody>
                    <AddEventForm onSuccess={onClose} />
                    <ModalFooter></ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};
