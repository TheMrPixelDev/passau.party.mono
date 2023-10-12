import { EventDAO } from "../../../shared/dataTypes";

export type EventContextType = {
  setEvents: (events: EventDAO[]) => void;
  events: EventDAO[];
};

export type SavedEventContextType = {
  setSavedEvents: (events: EventDAO[]) => void;
  savedEvents: EventDAO[];
};

export type Credentials = {
  username?: string;
  password?: string;
};
