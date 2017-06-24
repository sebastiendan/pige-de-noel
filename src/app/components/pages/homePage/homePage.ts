import {IComponentOptions} from 'angular';
import {IMembersFactory} from '../../../factories/MembersFactory';
import {Member} from '../../../models/Member';
require('./homePage.scss');

export default class HomePage implements IComponentOptions {

  public controller: any = HomePageController;
  public controllerAs: string = 'hpc';
  public template: string = require('./homePage.html');

}

class HomePageController {
  static $inject = ['MembersFactory'];

  members: Member[];
  manager: Member;

  constructor(private _membersFactory: IMembersFactory) {
  }

  $onInit = () => {
    this._membersFactory.all()
      .then((members: Member[]) => {
        this.members = members;

        if (members.length) {
          this.manager = members.find((member: Member) => {
            return member.isManager;
          });
        }
      });
  };
}