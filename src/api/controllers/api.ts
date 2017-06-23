import {Response, Request, NextFunction} from 'express';

let pigeMembers = require('../data/pigeMembers.json');

export let getPigeMembers = (req: Request, res: Response) => {
  res.status(200).json(pigeMembers);
};