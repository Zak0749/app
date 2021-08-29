import { ObjectId } from 'mongodb';

declare namespace e {
  type CategoryCol = {
    _id?: ObjectId;
    title: string;
  };

  type AnswerCol = {
    body: string;
    correct: boolean;
  };

  type QuestionCol = {
    body: string;
    answers: AnswerCol[];
  };

  type QuizCol = {
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

    questions: QuestionCol[];
  };

  type DraftCol = {
    _id?: ObjectId;
    title: string;
    emoji: string;
    description: string;
    date: Date;
    categoryId: ObjectId;
    questions: QuestionCol[];
  };

  type HistoryCol = {
    date: Date;
    quizId: ObjectId;
    progress: number;
  };

  type SavedCol = {
    date: Date;
    quizId: ObjectId;
  };

  type UserCol = {
    _id: ObjectId;
    username: string;
    email: string;
    password: string;
    emoji: string;
    date: Date;
    history: HistoryCol[];
    saved: SavedCol[];
    drafts: DraftCol[];
  };

  type AnyObj = {
    [key:string]: unknown
  }

  type User = {
    userId: string;
    username: string;
    email?: string;
    emoji: string;
    date: Date;
    owned: boolean;
    quizzes?: Quiz[];
  }

  type Quiz = {
    _id: string;
    title: string;
    emoji: string;
    description: string;
    date: Date;
    featured: boolean;
    categoryTitle: string;
    categoryId: string;
    plays: number;
    questions: Question[];
    userId: string;
    username: string;
    owned: boolean;
    played: boolean;
    saved: boolean;
    progress: number;
  }

  type Question = {
    body: string;
    answers: Answer[];
  }

  type Answer = {
    body: string;
    correct: boolean;
  }

  type SearchResult = {
    users: User[]
    quizzes: Quiz[]
  }

  type LoggedIn = {
    loggedIn: boolean;
    setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  }

  type Draft = {
    _id: string,
    title: string,
    emoji: string,
    description: string,
    date: string,
    categoryId: string,
    questions: Question[],
  }

  type Category = {
    id: string;
    title: string;
    quizzes: Quiz[]
  }

  type Editing = {
    title: string,
    emoji: string,
    description: string,
    categoryId: string,
    questions: Question[],
  }

  type Theme = {
    mainBg: 'black' | 'white'
    bg: 'bg-light' | 'bg-dark'
    text: 'text-light' | 'text-dark'
    main: 'dark' | 'light'
    opp: 'light' | 'dark'
  }
}

declare global {
  namespace Express {
    interface Request {
      currentUser: e.UserCol | undefined
    }
  }
}
  

export = e;
