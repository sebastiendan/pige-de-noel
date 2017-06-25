import {IComponentOptions, IFormController} from 'angular';
import {IStateService} from 'angular-ui-router';
import {IMembersFactory} from '../../../factories/MembersFactory';
import {Member} from '../../../../common/models/Member';

export default class MembersPage implements IComponentOptions {

  public controller: any = MembersPageController;
  public controllerAs: string = 'mpc';
  public template: string = require('./membersPage.html');

}

class MembersPageController {  
  static $inject = ['MembersFactory', '$state'];

  members: Member[];

  constructor(private _membersFactory: IMembersFactory,
              private $state: IStateService) {
  }

  $onInit = () => {
    this._membersFactory.all()
      .then((members: Member[]) => {
        if (!members.length)
          this.$state.go('home-page');
        
        this.members = members;
      });    
  };

  editMember = (member: Member) => {
    this.$state.go('member-page', {memberId: member.id});
  };
}