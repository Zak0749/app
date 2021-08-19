import { ObjectId } from 'mongodb';
import db from '../db/get';
import { userType } from '../@types/types';

async function getUser(id: string | ObjectId): Promise<userType | undefined> {
  if (!id) return undefined;
  const users = await db.users;
  const user = await users.findOne({ _id: new ObjectId(id) }) as userType;
  return user;
}

export default getUser;
