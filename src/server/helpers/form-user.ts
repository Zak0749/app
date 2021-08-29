import { QuizCol, User, UserCol } from '../..';
import db from '../db/get';
import { formQuizzes } from './form-quiz';

async function formUser(user: UserCol, session: UserCol | undefined): Promise<User> {
  const quizCollection = await db.quizzes;

  const quizzes = await quizCollection.find<QuizCol>({ userId: user._id }).toArray();

  if (session) {
    if (user._id.toHexString() === session._id.toString()) {
      return {
        userId: user._id.toHexString(),
        username: user.username,
        email: user.email,
        emoji: user.emoji,
        date: user.date,
        owned: true,
        quizzes: await formQuizzes(quizzes, session),
      };
    }
  }

  return {
    userId: user._id.toHexString(),
    username: user.username,
    emoji: user.emoji,
    date: user.date,
    owned: false,
    quizzes: await formQuizzes(quizzes, session),
  };
}

function formUsers(users:UserCol[], session: UserCol | undefined): Promise<User[]> {
  return Promise.all(users.map((user) => formUser(user, session)));
}

export { formUser, formUsers };
