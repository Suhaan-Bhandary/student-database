import { NextFunction, Request, Response } from 'express';
import { UserData } from '../controller/controller';

// A middleware to check if the user is authenticated or not, before any action
const isAdminAuth = (req: Request, res: Response, next: NextFunction) => {
  console.log(req.cookies);

  const cookieData: UserData = req.cookies['session-token'];

  // Check if data exits
  if (!cookieData || !cookieData.isAdmin) {
    res.clearCookie('session-token');
    return res.redirect('/admin/login');
  }

  return next();
};

export default isAdminAuth;
