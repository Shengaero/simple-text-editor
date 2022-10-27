import { openDB } from 'idb';

const dbName = 'jate';
const version = 1;

const initdb = async () =>
  openDB(dbName, version, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

export const putDb = async (content) => {
  const obj = { content };
  const db = await openDB(dbName, version);
  try {
    await db.put('jate', obj);
  } catch(err) {
    console.log(err);
  } finally {
    db.close();
  }
}

export const getDb = async () => {
  const db = await openDB(dbName, version);
  let content;
  try {
    content = (await db.getAll('jate'))[0].content;
  } finally {
    db.close();
  }
  return content;
}

initdb();
