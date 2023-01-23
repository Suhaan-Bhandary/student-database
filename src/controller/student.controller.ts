import { Request, Response } from 'express';
import prisma from '../services/prisma';

// Types
import { StudentData, UserData } from './controller';

export default {
  home: async (req: Request, res: Response) => {
    return res.render('studentHome', {
      name: 'suhaan',
      CLIENT_ID: process.env.CLIENT_ID,
    });
  },
  logInStudent: async (req: Request, res: Response) => {
    const body = req.body;
    const encodedCredential = body.credential;

    const userCookieData: UserData = {
      isAdmin: false,
      googleToken: encodedCredential,
    };

    // Store it in express session
    res.cookie('session-token', userCookieData);
    return res.status(200).json({ message: 'success' });
  },
  logOutStudent: async (req: Request, res: Response) => {
    res.clearCookie('session-token');

    // Return the success message
    return res.redirect('/');
  },
  getForm: async (req: Request, res: Response) => {
    console.log(req.googleData);
    const studentEmail = req.googleData?.email || '';

    // Get the student email

    let student = await prisma.student.findUnique({
      where: { emailId: studentEmail },
      select: {
        emailId: true,
        firstName: true,
        lastName: true,
        currentPost: true,
        linkedIn: true,
        mobile: true,
        otherUrls: true,
      },
    });

    // If the user is visiting for the first time then return a empty student object
    if (student === null) {
      student = {
        emailId: studentEmail,
        firstName: '',
        lastName: '',
        currentPost: '',
        linkedIn: '',
        mobile: '',
        otherUrls: [],
      };
    }

    console.log(student);
    return res.render('studentForm', { student });
  },
  update: async (req: Request, res: Response) => {
    const studentData: StudentData = req.body;

    // Check if input is correct
    if (
      !studentData.firstName ||
      !studentData.lastName ||
      !studentData.currentPost ||
      !studentData.emailId ||
      !studentData.linkedIn ||
      !studentData.mobile
    ) {
      return res
        .status(400)
        .json({ message: 'Please enter all required fields' });
    }

    // Create or update the student with the given email address
    const student = await prisma.student.upsert({
      where: {
        emailId: studentData.emailId,
      },
      update: {
        firstName: studentData.firstName,
        lastName: studentData.lastName,
        currentPost: studentData.currentPost,
        linkedIn: studentData.linkedIn,
        mobile: studentData.mobile,
      },
      create: {
        emailId: studentData.emailId,
        firstName: studentData.firstName,
        lastName: studentData.lastName,
        currentPost: studentData.currentPost,
        linkedIn: studentData.linkedIn,
        mobile: studentData.mobile,
      },
    });

    // Remove all the urls from the user
    await prisma.uRLS.deleteMany({ where: { studentId: student.id } });
    console.log(student);

    // Create other urls
    for (let i = 0; i < studentData.otherUrls.length; i++) {
      console.log(studentData);

      await prisma.uRLS.create({
        data: {
          name: studentData.otherUrls[i].name,
          url: studentData.otherUrls[i].url,
          studentId: student.id,
        },
      });
    }

    return res.status(200).json({ message: 'Updated a student' });
  },
  getSuccessPage: async (req: Request, res: Response) => {
    return res.render('success');
  },
};
