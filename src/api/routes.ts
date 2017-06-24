import * as path from 'path';
import {Response, Request} from 'express';

export = (app: Express.Application) => {
  (<any>app).use('/api/members', require('./routes/members'));
  (<any>app).use('/api/pige', require('./routes/pige'));

  (<any>app).get('/*', (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, '../src', 'index.html'));
  });    
};