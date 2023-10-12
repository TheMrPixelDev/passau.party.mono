import { MiddlewareHandler } from "hono";
import { validator } from "hono/validator";
import { eventConstraints, isValid } from "./eventValidation";
import { EventDTO, ResponseTypes } from "../../../shared/dataTypes";
import { generateResponse } from "./responses";

export const eventValidator = validator("json", (value, context) => {
  let valid: boolean;
  console.log(value);
  if (Array.isArray(value)) {
    valid = value.every((v) => isValid<EventDTO>(v, eventConstraints));
  } else {
    valid = isValid<Event>(value, eventConstraints);
  }

  if (valid) {
    return value;
  } else {
    return generateResponse(context, ResponseTypes.INVALID_BODY_TYPE);
  }
});
