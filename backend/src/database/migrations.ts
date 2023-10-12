import { Database } from "bun:sqlite";

const db = new Database("PartyDatabase.sqlite", { create: true });

/**
 * Write entity migrations here.
 */

db.query("DROP TABLE events;").run();

db.query(
  `CREATE TABLE IF NOT EXISTS events (
        id TEXT PRIMARY KEY NOT NULL,
        title TEXT NOT NULL,
        description TEXT,
        summary TEXT,
        rating INT,
        location TEXT,
        datetime INT,
        safe BOOLEAN
    );`,
).run();

db.close();
