import {
  CategoryCol, Quiz, QuizCol, UserCol,
} from '../..';
import db from '../db/get';

async function formQuiz(quiz:QuizCol, session: UserCol | undefined): Promise<Quiz> {
  const categorys = await db.categorys;
  const users = await db.users;

  if (!quiz) {
    throw Error('quiz is null');
  }
  const category = await categorys.findOne({ _id: quiz.categoryId }) as CategoryCol;
  const createdUser = await users.findOne({ _id: quiz.userId }) as UserCol;

  let progress = 0;
  let saved = false;
  let played = false;
  let owned = false;

  if (session) {
    if (session.history) {
      const history = session.history.find((i) => i.quizId.toHexString() === quiz._id?.toHexString());
      if (history) {
        progress = history.progress as number;
        played = true;
      }
    }

    if (session.saved) {
      saved = !!session.saved.find((i) => i.quizId.toHexString() === quiz._id?.toHexString());
    }

    if (createdUser) {
      if (createdUser._id.toHexString() === session._id.toString()) {
        owned = true;
      }
    }
  }

  return {
    _id: quiz._id?.toHexString() as string,
    title: quiz.title,
    emoji: quiz.emoji,
    description: quiz.description,
    date: quiz.date,
    featured: quiz.featured,
    categoryTitle: category.title || 'other',
    categoryId: category._id?.toHexString() as string,
    plays: quiz.plays,
    questions: quiz.questions,
    userId: quiz.userId.toHexString(),
    username: createdUser.username,
    owned,
    played,
    saved,
    progress,
  };
}

function formQuizzes(quizzes:QuizCol[], session: UserCol | undefined): Promise<Quiz[]> {
  return Promise.all(quizzes.map((quiz) => formQuiz(quiz, session)));
}

export { formQuiz, formQuizzes };
