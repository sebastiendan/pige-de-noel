import {Response, Request} from 'express';

let members = require('../data/members.json');

export let getMembers = (req: Request, res: Response) => {  
  res.status(200).json({
    result: members
  });
};