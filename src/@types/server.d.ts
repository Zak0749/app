/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
import { ObjectId } from 'mongodb';

declare global {
  namespace Express {
    interface Request {
      currentUser: usercol | undefined
    }
  }

  type categorycol = {
    _id?: ObjectId;
    title: string;
  };

  type answercol = {
    body: string;
    correct: boolean;
  };

  type questioncol = {
    body: string;
    answers: answercol[];
  };

  type quizcol = {
    _id?: ObjectId;
    title: string;
    emoji: string;
    description: string;
    date: Date;
    featured: boolean;
    categoryId: ObjectId;
    plays: number;
    userId: ObjectId;
    owned?: boolean;
    saved?: boolean;
    played?: boolean;

    questions: questioncol[];
  };

  type draftcol = {
    _id?: ObjectId;
    title: string;
    emoji: string;
    description: string;
    date: Date;
    categoryId: ObjectId;
    questions: questioncol[];
  };

  type historycol = {
    date: Date;
    quizId: ObjectId;
    progress: number;
  };

  type savedcol = {
    date: Date;
    quizId: ObjectId;
  };

  type usercol = {
    _id: ObjectId;
    username: string;
    email: string;
    password: string;
    emoji: string;
    date: Date;
    history: historycol[];
    saved: savedcol[];
    drafts: draftcol[];
  };

  type anyObj = {
    [key:string]: unknown
  }
}
