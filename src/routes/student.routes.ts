import { Router } from 'express';
import studentController from '../controller/student.controller';

const router = Router();

// All Student Routes
router.get("/form", studentController.getForm);
router.post("/", studentController.add);

export default router;
