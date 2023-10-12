import { EventDTO } from "../../../shared/dataTypes";

export type ValidationFunction = (data: any) => boolean;
export type ObjectValidationConstraints = {
  [key: string]: ValidationFunction;
};

export const eventConstraints: ObjectValidationConstraints = {
  "title": (data) =>
    typeof data === "string" && data !== undefined && data.length > 0,
  "description": (data) =>
    typeof data === "string" && data !== undefined && data.length > 0,
  "summary": (data) =>
    typeof data === "string" && data !== undefined && data.length > 0,
  "datetime": (data) =>
    typeof data === "number" && data !== undefined &&
    data > Math.floor(Date.now() / 1000),
  "rating": (data) =>
    typeof data === "number" && data !== undefined && data >= 0 && data <= 5,
  "location": (data) =>
    typeof data === "string" && data !== undefined && data.length > 0,
};

export function isValid<T>(
  obj: any,
  constraints: ObjectValidationConstraints,
): obj is T {
  const keysAreValid = Object.keys(constraints).every((key) =>
    Object.keys(obj).includes(key)
  );

  if (!keysAreValid) {
    return false;
  }

  const entriesAreValid = Object.keys(obj).every((key) => {
    const validationFunction = eventConstraints[key];
    const value = Object.entries(obj).find((entry) => entry[0] === key);
    return value !== undefined && validationFunction(value[1]);
  });

  return entriesAreValid;
}
