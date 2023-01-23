import { Request, Response } from 'express';
import { UserData } from './controller';

export default {
  home: async (req: Request, res: Response) => {
    return res.render('adminHome');
  },
  getLoginPage: async (req: Request, res: Response) => {
    return res.render('adminLogin');
  },
  adminLogin: async (req: Request, res: Response) => {
    const { name, password } = req.body;

    // Check if logged in or not
    if (
      name !== process.env.ADMIN_NAME ||
      password !== process.env.ADMIN_PASSWORD
    ) {
      return res.render('adminLogin', { isError: true });
    }

    // Store it in express session
    const userCookieData: UserData = { isAdmin: true };
    res.cookie('session-token', userCookieData);

    // Return admin page
    return res.redirect('/admin');
  },
};
