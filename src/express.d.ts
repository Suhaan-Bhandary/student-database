import { GoogleData } from './controller/controller';

declare global {
  namespace Express {
    interface Request {
      googleData?: GoogleData;
    }
  }
}

export {};
