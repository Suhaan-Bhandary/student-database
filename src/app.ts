import express from 'express';
import path from 'path';

import { adminRoutes, studentRoutes } from './routes';

const app = express();

// Configure Express to use EJS
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Middleware
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
app.get('/', (req, res) => {
  // return res.json({ message: 'Home Page in Development!!' });
  return res.render('home');
});

export default app;
