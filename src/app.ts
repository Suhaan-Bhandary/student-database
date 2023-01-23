import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';

import { adminRoutes, studentRoutes } from './routes';
import prisma from './services/prisma';

const app = express();

// Configure Express to use EJS
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Defining the public directory
app.use(express.static(__dirname + '/public'));

// Middleware
app.use(cookieParser());
app.use(express.json());

// Routes
/*
  TODO:

  Student routes
  1. Student should be able to add a student
  2. Student should be able to view the data after submit
  3. Student should be able to edit the data once viewed

  Admin routes
  1. Admin should be able to view the students, 
     and download the excel sheet for the query [Filters should be present]
  2. A login is required for admin routes
*/

app.use('/student', studentRoutes);
app.use('/student', adminRoutes);

// Home Page
app.get('/', async (req, res) => {
  const students = await prisma.student.findMany({
    select: { firstName: true, lastName: true, linkedIn: true },
  });

  return res.render('home', { students });
});

// Not found page
app.get('*', (req, res) => {
  return res.render('notFound');
});

export default app;
