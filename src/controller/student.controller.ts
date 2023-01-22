import { Request, Response } from 'express';
import prisma from '../services/prisma';

type StudentData = {
  firstName: string;
  lastName: string;
  currentPost: string;
  emailId: string;
  linkedIn: string;
  mobile: string;
  otherUrls: {
    name: string;
    url: string;
  }[];
};

export default {
  getForm: async (req: Request, res: Response) => {
    return res.render('studentForm');
  },
  add: async (req: Request, res: Response) => {
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

    // Create student
    const student = await prisma.student.create({
      data: {
        firstName: studentData.firstName,
        lastName: studentData.lastName,
        currentPost: studentData.currentPost,
        emailId: studentData.emailId,
        linkedIn: studentData.linkedIn,
        mobile: studentData.mobile,
      },
    });

    // Create other urls
    for (let i = 0; i < studentData.otherUrls.length; i++) {
      await prisma.uRLS.create({
        data: {
          name: studentData.otherUrls[i].name,
          url: studentData.otherUrls[i].url,
          studentId: student.id,
        },
      });
    }

    return res.status(200).json({ message: 'Created a student' });
  },
};
