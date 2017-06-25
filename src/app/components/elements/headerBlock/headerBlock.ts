import {IComponentOptions} from 'angular';
import {IStateService} from 'angular-ui-router';
import {IMembersFactory} from '../../../factories/MembersFactory';
import {IPigeFactory} from '../../../factories/PigeFactory';
import {Member} from '../../../../common/models/Member';
require('./headerBlock.scss');

export default class HeaderBlock implements IComponentOptions {

  public controller: any = HeaderBlockController;
  public controllerAs: string = 'hbc';
  public template: string = require('./headerBlock.html');

}

class HeaderBlockController {  
  static $inject = ['MembersFactory', 'PigeFactory', '$state'];

  members: Member[];
  manager: Member;
  pige: number[];

  constructor(private _membersFactory: IMembersFactory,
              private _pigeFactory: IPigeFactory,
              private $state: IStateService) {
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

        this._pigeFactory.get()
          .then((pige: number[]) => {
            this.pige = pige;
          });
      });
  };

  runPige = () => {
    this._pigeFactory.run()
      .then(() => {
        this.$state.go('pige-result-page', {}, {reload: true});
      });
  };
}