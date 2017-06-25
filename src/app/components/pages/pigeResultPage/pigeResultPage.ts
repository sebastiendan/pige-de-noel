import {IComponentOptions} from 'angular';
import {IStateService} from 'angular-ui-router';
import {IMembersFactory} from '../../../factories/MembersFactory';
import {IPigeFactory} from '../../../factories/PigeFactory';
import {Member} from '../../../../common/models/Member';
require('./pigeResultPage.scss');

export default class PigeResultPage implements IComponentOptions {

  public controller: any = PigeResultPageController;
  public controllerAs: string = 'prpc';
  public template: string = require('./pigeResultPage.html');

}

class PigeResultPageController {
  static $inject = ['PigeFactory', 'MembersFactory', '$state'];

  members: Member[];
  pige: number[];

  constructor(private _pigeFactory: IPigeFactory,
              private _membersFactory: IMembersFactory,
              private $state: IStateService) {
  }

  $onInit = () => {
    this._membersFactory.all()
      .then((members: Member[]) => {
        if (!members.length)
          this.$state.go('home-page');
        
        this.members = members;

        this.getPige();            
      });
  };

  getPige = () => {
    this._pigeFactory.get()
      .then((pige: number[]) => {
        this.pige = pige;
      })
      .catch(() => {
        this.$state.go('home-page');
      });
  };

  runPige = () => {
    this._pigeFactory.run()
      .then((pige: number[]) => {
        this.pige = pige;
      });
  };
}