import { Request, Response } from 'express';
import { UserData } from './controller';
import prisma from '../services/prisma';

export default {
  home: async (req: Request, res: Response) => {
    const students = await prisma.student.findMany({
      include: { otherUrls: true },
    });
    console.log(students);

    return res.render('adminHome', { students });
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
  logOutAdmin: async (req: Request, res: Response) => {
    res.clearCookie('session-token');

    // Return the success message
    return res.redirect('/');
  },
};
