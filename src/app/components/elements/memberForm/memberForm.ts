import {IComponentOptions} from 'angular';
import {IMembersFactory} from '../../../factories/MembersFactory';
import {Member} from '../../../models/Member';
require('./headerBlock.scss');

export default class HeaderBlock implements IComponentOptions {

  public controller: any = HeaderBlockController;
  public controllerAs: string = 'hbc';
  public template: string = require('./headerBlock.html');

}

class HeaderBlockController {  
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