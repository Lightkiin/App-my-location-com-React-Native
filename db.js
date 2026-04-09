import * as SQLite from "expo-sqlite";

const DATABASE_NAME = "locations.sqlite";

const SQL_CREATE_TABLE = `
CREATE TABLE IF NOT EXISTS locations (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  latitude REAL,
  longitude REAL
);
`;

let db = null;

export default function openDB() {
  if (!db) {
    db = SQLite.openDatabaseSync(DATABASE_NAME);

    db.withTransactionSync(() => {
      db.execSync(SQL_CREATE_TABLE);
    });
  }

  return db;
}