import {Response, Request} from 'express';
import {Member} from '../../common/models/Member';
import {members} from './members';

export let pige: number[];

export let runPige = (req: Request, res: Response) => {
  pige = runPigeCalc(members);

  if (!pige) {
    res.status(500).json({
      error: 'Erreur lors du calcul de la pige'
    });
  } else {
    res.status(200).json({
      result: pige
    });
  }
};

export let getPige = (req: Request, res: Response) => {  
  if (!pige) {
    res.status(404).json({
      error: 'La pige n\'a pas été lancée'
    });
  } else {
    res.status(200).json({
      result: pige
    });
  }
};

export let runPigeCalc = (members: Member[]) => {
  let feasibleMatrix: number[][] = [],  
      i: number,
      j: number,
      len: number = members.length;

  // Return null if impossible to solve
  // **********************************

  // There must be at least 2 members
  if (members.length < 3)
    return null;

  // There must be at least 4 members if there is a couple
  if (members.filter((member: Member) => { return member.spouseId }).length && members.length < 4)
    return null;

  // There must be a manager
  if (!members.find((member: Member) => { return member.isManager }))
    return null;

  // Create the feasible matrix
  // **************************

  // Start by making all cases feasible
  for (i = 0, len; i<len; i++) {
    feasibleMatrix[i] = [];

    for (j = 0, len; j<len; j++) {
      feasibleMatrix[i][j] = 1;
    }  
  }

  // Set some cases as not feasible
  for (i = 0, len; i<len; i++) {
    // One member cannot give a gift to himself/herself
    feasibleMatrix[i][i] = 0;
    
    // One member cannot give a gift to his/her spouse
    if (members[i].spouseId)
      feasibleMatrix[i][members[i].spouseId-1] = 0;
  }

  // Get a random permutation of the list of members
  // ***********************************************
  pige = getRandomPermutation();
  
  // Test if the permutation is ok, get a new one if not
  // ***************************************************
  while (!validatePermutation(pige, feasibleMatrix)) {
    pige = getRandomPermutation();
  }

  return pige;
};

let getRandomPermutation = () => {
  let randomArr: number[],
      sortedArr: number[],
      rankedArr: number[];

  // Create an members.length long array with random numbers
  randomArr = members.map(() => {
    return Math.random();
  });

  // Sort these numbers in a different array
  sortedArr = randomArr.slice().sort((a: number, b: number) => { return b-a; });

  // Rank these numbers in a different array to get a random permutation of members
  return randomArr.slice().map((v: number) => { return sortedArr.indexOf(v)+1; });
};

let validatePermutation = (permutation: number[], feasibleMatrix: number[][]) => {
  let i: number,
      len: number = members.length;

  for (i=0, len; i<len; i++) {
    if (!feasibleMatrix[i][permutation[i]-1])
      return false;
  }

  return true;
};