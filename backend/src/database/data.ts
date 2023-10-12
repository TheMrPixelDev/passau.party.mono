import { Database } from "bun:sqlite";
import { EventDAO, EventDTO } from "../../../shared/dataTypes";
import { randomUUID } from "crypto";

const db = new Database("PartyDatabase.sqlite", { readwrite: true });

const INSERT_EVENT_QUERY_STRING =
  "INSERT INTO events (id, title, description, summary, rating, location, datetime, safe) VALUES ($id, $title, $description, $summary, $rating, $location, $datetime, $safe);";
const SELECT_EVENT_LIMITED_QUERY_STRING =
  "SELECT * FROM events WHERE safe = $safe LIMIT $limit;";
const UPDATE_EVENT_SAFETY_QUERY_STRING =
  "UPDATE events SET safe = $safe WHERE id = $eventId;";
const DELETE_EVENT_BY_ID = "DELETE FROM events WHERE id = $id";

const insertSingleEventQuery = db.query(
  INSERT_EVENT_QUERY_STRING,
);
const delteEventById = db.query(DELETE_EVENT_BY_ID);
const insertEvent = db.prepare(INSERT_EVENT_QUERY_STRING);
const insertMultipleEventsQuery = db.transaction((events) => {
  (events as EventDAO[]).forEach((event) => insertEvent.run(event));
  return events.length;
});
const selectEventsFiltered = db.query<
  EventDAO,
  { $limit: number; $safe: boolean }
>(
  SELECT_EVENT_LIMITED_QUERY_STRING,
);
const updateEventSafety = db.query(UPDATE_EVENT_SAFETY_QUERY_STRING);

/**
 * Function to access the database.
 */
export const deleteEvent = (id: string) => {
  return delteEventById.get({ $id: id });
};

export const addEvent = (data: EventDTO) => {
  // $id, $title, $description, $summary, $rating, $location, $datetime, $safe
  return insertSingleEventQuery.all({
    $id: randomUUID(),
    $title: data.title,
    $description: data.description,
    $summary: data.summary,
    $rating: data.rating,
    $location: data.location,
    $datetime: data.datetime,
    $safe: false,
  });
};

export const addEvents = (data: EventDTO[]) => {
  // $id, $title, $description, $summary, $rating, $location, $datetime, $safe
  const events = data.map((event) => {
    return {
      $id: randomUUID(),
      $title: event.title,
      $description: event.description,
      $summary: event.summary,
      $rating: event.rating,
      $location: event.location,
      $datetime: event.datetime,
      $safe: false,
    };
  });
  insertMultipleEventsQuery(events);
};

export const getEvents = (
  safe: boolean,
  limit?: number,
): EventDAO[] => {
  const events = selectEventsFiltered.all({
    $limit: limit === undefined || isNaN(limit) ? 100 : limit,
    $safe: safe,
  });

  return events.map((event) => {
    return { ...event, safe: Boolean(event.safe) };
  });
};

export const updateEventsSafety = (id: string, safe: boolean) => {
  return updateEventSafety.run({ $eventId: id, $safe: safe });
};
