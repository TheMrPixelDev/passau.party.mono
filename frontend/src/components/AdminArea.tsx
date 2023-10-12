import {
    Card,
    CardHeader,
    Container,
    VStack,
    Text,
    CardBody,
    FormControl,
    CardFooter,
    FormLabel,
    Spacer,
    Input,
    Button,
    useToast,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { AdminPanel } from './AdminPanel';
import { CheckIcon, WarningIcon } from '@chakra-ui/icons';
import { Credentials } from '../types/uiTypes';
import { hostname } from '../data/request';

export const AdminArea = () => {
    const [loggedIn, setLoggedIn] = useState<boolean>(false);
    const [credentials, setCredentials] = useState<Credentials>({});
    const toast = useToast();

    useEffect(() => {
        attemptLogin();
    }, []);

    const attemptLogin = () => {
        fetch(`${hostname}/auth`, {
            headers: {
                Authorization: `Basic ${btoa(credentials.username + ':' + credentials.password)}`,
            },
        }).then((res) => {
            if (res.ok) {
                setLoggedIn(true);
                toast({
                    colorScheme: 'green',
                    variant: 'subtle',
                    icon: <CheckIcon />,
                    position: 'top',
                    description: 'Login erfolgreich',
                });
            } else {
                setLoggedIn(false);
                toast({
                    colorScheme: 'red',
                    variant: 'subtle',
                    icon: <WarningIcon />,
                    position: 'top',
                    description: 'Login fehlgeschlagen',
                });
            }
        });
    };

    if (loggedIn) {
        return <AdminPanel credentials={credentials} />;
    } else {
        return (
            <Container marginTop={5}>
                <Card>
                    <CardHeader>
                        <Text fontSize={'2xl'} fontWeight={'bold'}>
                            Login
                        </Text>
                    </CardHeader>
                    <CardBody>
                        <VStack>
                            <FormControl>
                                <FormLabel>Benutzername</FormLabel>
                                <Input
                                    value={credentials.username}
                                    onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                                    variant={'filled'}
                                    type="text"
                                />
                            </FormControl>
                            <Spacer />
                            <FormControl>
                                <FormLabel>Passwort</FormLabel>
                                <Input
                                    value={credentials.password}
                                    onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                                    variant={'filled'}
                                    type="password"
                                />
                            </FormControl>
                        </VStack>
                    </CardBody>
                    <CardFooter>
                        <Button colorScheme="purple" onClick={attemptLogin}>
                            Einloggen
                        </Button>
                    </CardFooter>
                </Card>
            </Container>
        );
    }
};
