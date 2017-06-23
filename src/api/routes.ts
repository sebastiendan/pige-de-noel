import * as path from 'path';
import * as apiController from './controllers/api';
import {Response, Request} from 'express';

export = (app: Express.Application) => {
  (<any>app).get('/api', apiController.getPigeMembers);

  (<any>app).get('/*', (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, '../src', 'index.html'));
  });    
};