import { Router } from 'express';
import studentController from '../controller/student.controller';
import isStudentAuth from '../middleware/isStudentAuth';

const router = Router();

// All Student Routes
router.get('/login', studentController.home);
router.post('/login', studentController.logInStudent);
router.get('/logout', studentController.logOutStudent);

router.get('/form', isStudentAuth, studentController.getForm);
router.put('/form', studentController.update);
router.get('/success', isStudentAuth, studentController.getSuccessPage);

export default router;
