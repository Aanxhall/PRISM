const sqlite3 = require("sqlite3");
const { open } = require("sqlite");

async function initializeDatabase() {
  const db = await open({
    filename: "./prism.db",
    driver: sqlite3.Database,
  });

  await db.exec(`
    CREATE TABLE IF NOT EXISTS reports (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT,
      category TEXT,
      location TEXT,
      priority TEXT,
      description TEXT,
      status TEXT
    );
  `);

  console.log("✅ SQLite Database Connected");

  return db;
}

module.exports = initializeDatabase;