import * as pigeController from '../src/api/controllers/pige';
import {Member} from '../src/common/models/Member';

describe("Pige algorithm", function () {
  let members: Member[];

  it("should return a result for all members", () => {
    members = require('./data/membersUC1.json');
    expect(pigeController.runPigeCalc(members).length).toBe(members.length);
  });

  it("should return no pige if impossible to solve", () => {
    members = require('./data/membersUC2.json');
    expect(pigeController.runPigeCalc(members)).toBeNull();
  });

  it("should return no pige if there is no pige manager", () => {
    members = require('./data/membersUC3.json');
    expect(pigeController.runPigeCalc(members)).toBeNull();
  });
});