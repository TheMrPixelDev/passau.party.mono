import { Context } from "hono";
import { ResponseTypes } from "../../../shared/dataTypes";

export const generateResponse = (context: Context, type: ResponseTypes) => {
  switch (type) {
    case ResponseTypes.INVALID_BODY_TYPE:
      context.status(422);
      return context.json({ type });
    case ResponseTypes.INVALID_VALUE:
      context.status(400);
      return context.json({ type });
    case ResponseTypes.DATA_MANIPULATION_SUCCESS:
      context.status(200);
      return context.json({ type });
    case ResponseTypes.DATA_WRITE_SUCCESS:
      context.status(200);
      return context.json({ type });
    case ResponseTypes.DATA_MANIPULATION_ERROR:
      context.status(500);
      return context.json({ type });
    case ResponseTypes.BACKEND_ERROR:
      context.status(500);
      return context.json({ type });
    case ResponseTypes.DATA_WRITE_ERROR:
      context.status(500);
      return context.json({ type });
    case ResponseTypes.AUTHORIZATION_ERROR:
      context.status(500);
      return context.json({ type });
    case ResponseTypes.AUTHORIZATION_SUCCESS:
      context.status(200);
      return context.json({ type });
    default:
      throw new Error("ResponseType not yet implemented " + type);
  }
};
