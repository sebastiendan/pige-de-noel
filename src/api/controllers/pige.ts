import {Response, Request} from 'express';

let pige = require.resolve('../data/pige.json');

export let getPige = (req: Request, res: Response) => {  
  if (Object.keys(pige).length === 0 && pige.constructor === Object) {
    res.status(304).json({
      error: 'La pige n\'a pas été lancée'
    });
  } else {
    res.status(200).json({
      result: pige
    });
  }
};