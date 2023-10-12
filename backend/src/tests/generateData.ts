import { addEvent } from "../database/data";

const unixTime = Math.floor(Date.now() / 1000);

addEvent({
  description: "Hello World",
  location: "Uni",
  datetime: unixTime,
  rating: 3,
  summary: "Zusammenfassung",
  title: "Tolles Event",
});
