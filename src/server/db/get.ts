import { MongoClient } from 'mongodb';
import { MongoMemoryServer } from 'mongodb-memory-server';
import setup from './setup';

let mongod: MongoMemoryServer;
let conn : MongoClient;

async function getConn():Promise<MongoClient> {
  if (!conn) {
    if (process.env.JEST_WORKER_ID !== undefined) {
      mongod = await MongoMemoryServer.create();
      const uri = mongod.getUri();
      conn = await MongoClient.connect(uri);
      await setup(conn);
    } else {
      const uri = 'mongodb://localhost:27017';
      conn = await MongoClient.connect(uri);
    }
  }
  return conn;
}

async function end(): Promise<void> {
  await conn.close();

  if (process.env.JEST_WORKER_ID !== undefined) {
    await mongod.stop();
  }
}

async function collection(colName:string) {
  const connection = await getConn();
  return connection.db('quizDb').collection(colName);
}

const db = {
  users: collection('Users'),
  quizzes: collection('Quizzes'),
  categorys: collection('Categorys'),
};

export default db;
export { getConn, end };
