import { join, dirname } from "path";
import { Low, JSONFile } from 'lowdb';
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const file = join(__dirname, 'db.json');
const adapter = new JSONFile(file);
const db = new Low(adapter);

async function getDb () {
  if (!db.data) {
    await db.read();
  }
  return db;
}

export default getDb;
