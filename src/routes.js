import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import SessionController from './app/controllers/SessionController';
import StudentController from './app/controllers/StudentController';
import PlanController from './app/controllers/PlanController';
import RegistrationController from './app/controllers/RegistrationController';

import authMiddleware from './app/middlewares/auth';
import checkStudentExists from './app/middlewares/checkStudentExists';
import checkPlanExists from './app/middlewares/checkPlanExists';
import checkRegistrationExists from './app/middlewares/checkRegistrationExists';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);

routes.get('/students', StudentController.index);
routes.get('/students/:id', checkStudentExists, StudentController.show);
routes.post('/students', StudentController.store);
routes.put('/students/:id', checkStudentExists, StudentController.update);
routes.delete('/students/:id', checkStudentExists, StudentController.delete);

routes.get('/plans', PlanController.index);
routes.get('/plans/:id', checkPlanExists, PlanController.show);
routes.post('/plans', PlanController.store);
routes.put('/plans/:id', checkPlanExists, PlanController.update);
routes.delete('/plans/:id', checkPlanExists, PlanController.delete);

routes.get('/registrations', RegistrationController.index);
routes.get(
  '/registrations/:id',
  checkRegistrationExists,
  RegistrationController.show
);
routes.post('/registrations', RegistrationController.store);
routes.put(
  '/registrations/:id',
  checkPlanExists,
  RegistrationController.update
);
routes.delete(
  '/registrations/:id',
  checkRegistrationExists,
  RegistrationController.delete
);

routes.post('/files', upload.single('file'), (req, res) => {
  return res.json(req.file);
});
export default routes;
