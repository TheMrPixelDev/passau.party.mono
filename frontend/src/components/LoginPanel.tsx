import {
    CardHeader,
    Card,
    Container,
    CardBody,
    CardFooter,
    FormControl,
    Input,
    FormLabel,
    Text,
    Spacer,
    VStack,
} from '@chakra-ui/react';

export const LoginPanel = () => {
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
                            <Input variant={'filled'} type="text" />
                        </FormControl>
                        <Spacer />
                        <FormControl>
                            <FormLabel>Passwort</FormLabel>
                            <Input variant={'filled'} type="password" />
                        </FormControl>
                    </VStack>
                </CardBody>
                <CardFooter></CardFooter>
            </Card>
        </Container>
    );
};
