import { openDB } from 'idb';

const dbName = 'jate';
const version = 2;

const initdb = async () =>
  openDB(dbName, version, {
    upgrade(db) {
      if(db.objectStoreNames.contains('jate')) {
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
  const transaction = db.transaction('jate', 'readwrite');
  try {
    await transaction.store.clear();
    await transaction.store.put(obj);
    transaction.commit();
  } catch(err) {
    transaction.abort();
    console.log(err);
  } finally {
    db.close();
  }
};

export const getDb = async () => {
  const db = await openDB(dbName, version);
  let content;
  try {
    const query = await db.getAll('jate')[0];
    if(query) {
      content = query.content;
    }
  } finally {
    db.close();
  }
  return content;
};

initdb();
