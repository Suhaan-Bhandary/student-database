import { Router } from 'express';
import adminController from '../controller/admin.controller';
import isAdminAuth from '../middleware/isAdminAuth';

const router = Router();

// All Admin Routes
router.get('/', isAdminAuth, adminController.home);

router.get('/login', adminController.getLoginPage);
router.post('/login', adminController.adminLogin);

export default router;
