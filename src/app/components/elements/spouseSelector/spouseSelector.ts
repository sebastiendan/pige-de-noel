import {IComponentOptions} from 'angular';
import {IMembersFactory} from '../../../factories/MembersFactory';
import {Member} from '../../../../common/models/Member';
import * as angular from 'angular';

export default class SpouseSelector implements IComponentOptions {

  public controller: any = SpouseSelectorController;
  public controllerAs: string = 'ssc';
  public template: string = require('./spouseSelector.html');
  public bindings: {[x: string]: string} = {
    member: '='
  };

}

class SpouseSelectorController {  
  static $inject = ['MembersFactory'];

  member: Member;
  members: Member[];
  searchText: string;
  selectedSpouse: Member;

  constructor(private _membersFactory: IMembersFactory) {
  }

  $onInit = () => {
    this._membersFactory.all()
      .then((members: Member[]) => {
        this.members = members
          .filter((member: Member) => {
            return member.id != this.member.id;
          })
          .map((member: Member) => {
            member.fullName = member.firstName + ' ' + member.lastName;
            return member;
          });

        if (this.member.spouseId)
          this.selectedSpouse = this.members.find((member: Member) => { return member.id == this.member.spouseId });
      });
  };

  selectedSpouseChange = (spouse: Member) => {
    this.member.spouseId = spouse ? spouse.id : null;
  };

  querySearch = (query: string) => {  
    return query ? this.members.filter(this.createFilterFor(query)) : this.members;
  };

  createFilterFor = (query: string) => {
    let lowercaseQuery = angular.lowercase(query),
        filterFn = (spouse: Member) => {
          let lowercaseName = angular.lowercase(spouse.fullName);

          return (lowercaseName.indexOf(lowercaseQuery) > -1);
        };
    
    return filterFn;
  };
}