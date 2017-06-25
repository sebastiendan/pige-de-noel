import {IComponentOptions, IFormController, IPromise} from 'angular';
import {IStateService, IStateParamsService} from 'angular-ui-router';
import {IMembersFactory} from '../../../factories/MembersFactory';
import {Member} from '../../../../common/models/Member';

export default class MemberPage implements IComponentOptions {

  public controller: any = MemberPageController;
  public controllerAs: string = 'mpc';
  public template: string = require('./memberPage.html');

}

class MemberPageController {  
  static $inject = ['MembersFactory', '$stateParams', '$state'];

  member: Member;
  memberForm : IFormController;
  memberId: number;  

  constructor(private _membersFactory: IMembersFactory,
              private $stateParams: IStateParamsService,
              private $state: IStateService) {
  }

  $onInit = () => {
    if (this.$stateParams.memberId) {
      this._membersFactory.get(this.$stateParams.memberId)
        .then((member: Member) => {
          this.member = member;          
        })
        .catch(() => {
          this.$state.go('home-page');
        });
    } else {
      this.member = new Member();
    }
  };

  submit = () => {
    let promise: IPromise<Member>;

    if (this.memberForm.$valid) {
      if (this.member.id) {
        promise = this._membersFactory.patch(this.member);
      } else {
        promise = this._membersFactory.post(this.member);
      }
      
      promise
        .then(() => {
          this._membersFactory.reset();
          this.$state.go('members-page');
        });
    }
  };
}