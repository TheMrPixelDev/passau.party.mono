import { Hono } from "hono";
import { cors } from "hono/cors";
import { basicAuth } from "hono/basic-auth";
import {
  addEvent,
  addEvents,
  deleteEvent,
  getEvents,
  updateEventsSafety,
} from "./database/data";
import { EventDTO, ResponseTypes } from "../../shared/dataTypes";
import { adminCredentials } from "./config";
import { eventValidator } from "./utils/middlewareFunctions";
import { generateResponse } from "./utils/responses";

const app = new Hono();

app.use("/*", cors());

app.get("/events", (context) => {
  const safe = context.req.query("safe");
  const limit = Number(context.req.query("limit"));

  if (safe === undefined) {
    return context.json([...getEvents(true, limit)]);
  }

  if (safe === "both") {
    return context.json([
      ...getEvents(true, limit),
      ...getEvents(false, limit),
    ]);
  }

  const safeParsed = safe === "true" ? true : safe === "false" ? false : true;
  return context.json([...getEvents(safeParsed)]);
});

app.post("/events", eventValidator, async (context) => {
  const event = await context.req.json<EventDTO | EventDTO[]>();
  console.log(event);
  const insertFunction = Array.isArray(event) ? addEvents : addEvent;
  context.json;
  try {
    // @ts-ignore
    insertFunction(event);
    return generateResponse(context, ResponseTypes.DATA_WRITE_SUCCESS);
  } catch (e: any) {
    console.log(e);
    return generateResponse(context, ResponseTypes.DATA_WRITE_ERROR);
  }
});

app.put("/events/:id/setUnsafe", basicAuth(adminCredentials), (context) => {
  try {
    updateEventsSafety(context.req.param().id, false);
    return generateResponse(context, ResponseTypes.DATA_MANIPULATION_SUCCESS);
  } catch (e: any) {
    console.log(e);
    return generateResponse(context, ResponseTypes.DATA_MANIPULATION_ERROR);
  }
});

app.put("/events/:id/setSafe", basicAuth(adminCredentials), (context) => {
  try {
    updateEventsSafety(context.req.param().id, true);
    return generateResponse(context, ResponseTypes.DATA_MANIPULATION_SUCCESS);
  } catch (e: any) {
    console.log(e);
    return generateResponse(context, ResponseTypes.DATA_MANIPULATION_ERROR);
  }
});

app.delete("events/:id", basicAuth(adminCredentials), (context) => {
  const id = context.req.param("id");
  try {
    deleteEvent(id);
    return generateResponse(context, ResponseTypes.DATA_MANIPULATION_SUCCESS);
  } catch (e: any) {
    console.log(e);
    return generateResponse(context, ResponseTypes.DATA_MANIPULATION_ERROR);
  }
});

app.get("/auth", basicAuth(adminCredentials), (context) => {
  return generateResponse(context, ResponseTypes.AUTHORIZATION_SUCCESS);
});

export default {
  port: 8080,
  fetch: app.fetch,
};
