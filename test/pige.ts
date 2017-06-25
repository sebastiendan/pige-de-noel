import * as pigeController from '../src/api/controllers/pige';
import {Member} from '../src/common/models/Member';

describe("Pige algorithm", () => {
  let members: Member[];

  // UC1: normal set of data
  it("should return a result for all members", () => {
    members = require('./data/membersUC1.json');
    expect(pigeController.runPigeCalc(members).length).toEqual(members.length);
  });

  // UC2: only one couple plus one single person
  it("should return no pige if impossible to solve", () => {
    members = require('./data/membersUC2.json');
    expect(pigeController.runPigeCalc(members)).toBeNull();
  });

  // UC3: no pige manager among members
  it("should return no pige if there is no pige manager", () => {
    members = require('./data/membersUC3.json');
    expect(pigeController.runPigeCalc(members)).toBeNull();
  });
});