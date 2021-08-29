import { ObjectId } from 'mongodb';
import { UserCol } from '../..';
import db from '../db/get';

async function getUser(id: string | ObjectId): Promise<UserCol | undefined> {
  if (!id) return undefined;
  const users = await db.users;
  const user = await users.findOne({ _id: new ObjectId(id) }) as UserCol;
  return user;
}

export default getUser;
