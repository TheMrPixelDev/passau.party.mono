import { AllEventsView } from './components/AllEventsView';
import { SavedEventsView } from './components/SavedEventsView';
import { Box, Container, Flex, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import { EventContext, SavedEventContext } from './data/contexts';
import { useState } from 'react';
import { EventDAO } from '../../shared/dataTypes';
import { QueryProvider } from './components/QueryProvider';
import { AddEventModal } from './components/AddEventModal';

function App() {
    const [events, setEvents] = useState<EventDAO[]>([]);
    const [savedEvents, setSavedEvents] = useState<EventDAO[]>([]);

    return (
        <EventContext.Provider value={{ events, setEvents }}>
            <SavedEventContext.Provider value={{ savedEvents: savedEvents, setSavedEvents: setSavedEvents }}>
                <QueryProvider />
                <Container maxW={'container.xl'}>
                    <Tabs variant={'solid-rounded'}>
                        <Flex
                            margin={4}
                            flexWrap={'wrap'}
                            flexFlow={'wrap'}
                            flexDirection={'row'}
                            justifyContent={'space-between'}
                        >
                            <Box marginTop={'2'}>
                                <TabList>
                                    <Tab>Alle Events</Tab>
                                    <Tab>Gespeicherte Events</Tab>
                                </TabList>
                            </Box>
                            <Box marginTop={'2'}>
                                <AddEventModal />
                            </Box>
                        </Flex>
                        <TabPanels>
                            <TabPanel>
                                <AllEventsView />
                            </TabPanel>
                            <TabPanel>
                                <SavedEventsView />
                            </TabPanel>
                        </TabPanels>
                    </Tabs>
                </Container>
            </SavedEventContext.Provider>
        </EventContext.Provider>
    );
}

export default App;
