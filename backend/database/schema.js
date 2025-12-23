const initDB = require("./db");

async function createTables() {
    const db = await initDB();

    await db.run(
        `CREATE TABLE IF NOT EXISTS users(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        created_at TEXT DEFAULT CURRENT_TIMESTAMP)`
    );
    console.log('USER table ready');
    return db;
}

module.exports = createTables;