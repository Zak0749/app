import express, { Request, Response } from 'express';
import createError, { HttpError } from 'http-errors';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import passport from 'passport';
import { Strategy } from 'passport-local';
import bcyrpt from 'bcrypt';
import session from 'express-session';
import dotenv from 'dotenv';
import router from './routes/router';
import db from './db/get';
import getUser from './helpers/getUser';
import { formQuizzes } from './helpers/form-quiz';
import { QuizCol, UserCol } from '..';

passport.use(new Strategy(async (username, password, done) => {
  try {
    const users = await db.users;
    const user = await users.findOne({ username }) as UserCol;
    if (!user) return done(null, false);
    if (!await bcyrpt.compare(password, user.password)) return done(null, false);
    return done(null, user);
  } catch (error:any) {
    return done(error);
  }
}));

passport.serializeUser((user, done) => {
  const id = (user as UserCol)._id.toHexString();
  done(null, id);
});

passport.deserializeUser(async (id, done) => {
  const user = await getUser(id as string);
  done(null, user);
});

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
  secret: dotenv.config().parsed!['SESSION-SECRET'],
  resave: true,
  saveUninitialized: true,
  cookie: {
    sameSite: 'strict',
  },
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(cookieParser());

app.use(logger('dev'));
app.use(express.static(path.join(__dirname, '..', 'client')));
app.use(express.static('public'));

app.use(async (req, res, next) => {
  res.contentType('application/json');

  req.currentUser = req.user as UserCol | undefined;
  next();
});

app.use(router);

app.post('/api/session', passport.authenticate('local'), (req, res) => {
  res.sendStatus(201);
});

app.delete('/api/session', (req, res) => {
  if (!req.currentUser) { res.sendStatus(401); return; }
  req.logout();
  res.sendStatus(200);
});

app.get('/api/session', async (req, res) => {
  const quizCol = await db.quizzes;
  const quizzes = await quizCol.find({ username: req.currentUser?.username }).toArray() as QuizCol[];
  if (!req.currentUser) { res.sendStatus(401); return; }
  res.status(200).json({
    username: req.currentUser.username,
    emoji: req.currentUser.emoji,
    email: req.currentUser.email,
    date: req.currentUser.date,
    quizzes: await formQuizzes(quizzes, req.currentUser),
  });
});

app.get('/api/loggedin', (req, res) => {
  res.status(200).json(req.isAuthenticated());
});

app.use('*', (req, res) => {
  res.contentType('html');
  res.sendFile(path.join(__dirname, '..', 'client', 'index.html'));
});

app.use((req, _res, next) => {
  next(createError(404));
});

app.use((err:HttpError, req:Request, res:Response) => {
  res.locals.message = err.message;

  res.status(err.status || 500);
  res.send(err);
});

export default app;
