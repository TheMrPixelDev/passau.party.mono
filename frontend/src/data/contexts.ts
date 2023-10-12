import { createContext } from "react";
import { EventContextType, SavedEventContextType } from "../types/uiTypes";

export const EventContext = createContext<EventContextType>({
  events: [],
  setEvents: () => {},
});

export const SavedEventContext = createContext<SavedEventContextType>({
  savedEvents: [],
  setSavedEvents: () => {},
});
