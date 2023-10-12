import { getEvents } from "./src/database/data";
import { EventDTO } from "./src/types/dataTypes";
import { isValidEvent } from "./src/utils/eventValidation";

const testEvent = {
  title: "Hello",
  description: "jklasdf",
  summary: "jaklsdjf",
  location: "jaklsdfj",
  datetime: 8392893,
  rating: 5,
};

console.log(getEvents());
