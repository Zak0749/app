import setUp from './setup';
import { getConn } from './get';

async function format() {
  const conn = await getConn();
  const collections = await conn.db('quizDb').collections();

  collections.forEach(async (element) => {
    await element.drop();
  });

  await setUp(conn);
  // eslint-disable-next-line no-console
  console.log('done');
  await conn.close();
}

format();
