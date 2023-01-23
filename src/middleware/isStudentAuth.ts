import jwt_decode from 'jwt-decode';
import dayjs from 'dayjs';
import { NextFunction, Request, Response } from 'express';
import { GoogleData, UserData } from '../controller/controller';

// A middleware to check if the user is authenticated or not, before any action
const isStudentAuth = (req: Request, res: Response, next: NextFunction) => {
  console.log(req.cookies);
  
  const cookieData: UserData = req.cookies['session-token'];

  // Check if data exits
  if (!cookieData || !cookieData.googleToken || cookieData.isAdmin) {
    res.clearCookie('session-token');
    return res.redirect('/student/login');
  }

  const googleData: GoogleData = jwt_decode(cookieData.googleToken);

  // isExpired
  const timeRemaining = dayjs.unix(googleData.exp).diff(dayjs(), 'minute');
  const isExpired = timeRemaining < 1;

  if (isExpired) {
    res.clearCookie('session-token');
    return res.redirect('/student/login');
  }

  // Google Data
  console.log(googleData);
  req.googleData = googleData;

  return next();
};

export default isStudentAuth;
