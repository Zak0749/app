/* eslint-disable no-unused-vars */
type user = {
  userId: string;
  username: string;
  email?: string;
  emoji: string;
  date: Date;
  owned: boolean;
  quizzes?: quiz[];
}

type quiz = {
  _id: string;
  title: string;
  emoji: string;
  description: string;
  date: Date;
  featured: boolean;
  categoryTitle: string;
  categoryId: string;
  plays: number;
  questions: question[];
  userId: string;
  username: string;
  owned: boolean;
  played: boolean;
  saved: boolean;
  progress: number;
}

type question = {
  body: string;
  answers: answer[];
}

type answer = {
  body: string;
  correct: boolean;
}

type searchResult = {
  users: user[]
  quizzes: quiz[]
}

type loggedIn = {
  loggedIn: boolean;
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

type draft = {
  _id: string,
  title: string,
  emoji: string,
  description: string,
  date: string,
  categoryId: string,
  questions: question[],
}

type category = {
  id: string;
  title: string;
  quizzes: quiz[]
}
