import { NextFunction, Request, Response } from 'express';

function authenticated(req: Request, res: Response, next: NextFunction): void {
  if (req.currentUser) {
    next();
    return;
  }

  res.sendStatus(401);
}

function notAuthenticated(req: Request, res: Response, next: NextFunction): void {
  if (!req.currentUser) {
    next();
    return;
  }

  res.sendStatus(401);
}

const onlyOn = {
  authenticated,
  notAuthenticated,
};

export default onlyOn;
