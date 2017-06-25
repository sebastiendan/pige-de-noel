import {Response, Request} from 'express';
import {Member} from '../../common/models/Member';

let members = require('../data/members.json');

export let getMembers = (req: Request, res: Response) => {  
  res.status(200).json({
    result: members
  });
};

export let getMember = (req: Request, res: Response) => {  
  const memberId: number = req.params.memberId;
  let member: Member;        

  if (memberId) {
    member = members.find((member: Member) => { return member.id == memberId });

    if (member) {
      res.status(200).json({
        result: member
      });
    } else {
      res.status(404).json({
        error: 'Aucun membre correspondant trouvé'
      });
    }
  } else {
    res.status(400).json({
      error: 'Aucun id de membre reçu'
    });
  }
};

export let postMember = (req: Request, res: Response) => {  
  let member: Member;

  if (!req.body) {
    res.status(400).json({
      error: 'Aucun membre reçu'
    });
  } else {
    member = new Member();
    member.firstName = req.body.firstName;
    member.lastName = req.body.lastName;
    member.isManager = req.body.isManager;
    member.spouseId = req.body.spouseId;
    member.id = setMemberId();

    members.push(member);

    // Save spouse relation in spouse member object as well
    if (member.spouseId)
      members.find((member: Member) => { return member.id == req.body.spouseId; }).spouseId = member.id;

    res.status(200).json({
      result: member
    });
  }
};

export let patchMember = (req: Request, res: Response) => {  
  let member: Member;

  if (!req.body) {
    res.status(400).json({
      error: 'Aucun membre reçu'
    });
  } else {
    member = new Member();
    member.firstName = req.body.firstName;
    member.lastName = req.body.lastName;
    member.isManager = req.body.isManager;
    member.spouseId = req.body.spouseId;
    member.id = req.body.id;

    members[members.indexOf(members.find((member: Member) => { return member.id == req.body.id; }))] = member;

    // Save spouse relation in spouse member object as well
    if (member.spouseId)
      members.find((member: Member) => { return member.id == req.body.spouseId; }).spouseId = member.id;

    res.status(200).json({
      result: member
    });
  }
};

let setMemberId = () => {
  let id: number = 0,
      i: number,
      len: number;

  for (i = 0, len = members.length; i<len; i++) {
    if (id < members[i].id)
      id = members[i].id;
  }

  id++;

  return id;
};