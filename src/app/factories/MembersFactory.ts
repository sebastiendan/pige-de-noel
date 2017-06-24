import {IPromise, IQService, IHttpPromiseCallbackArg, IHttpService, IWindowService} from 'angular';
import {HttpResponse} from '../models/HttpResponse';
import {Member} from '../models/Member';

export interface IMembersFactory {
  all(): IPromise<Member[] | { [id: string]: Array<string> }>;
}

export class MembersFactory implements IMembersFactory {
  static $inject = ['$http', '$q', '$window'];

  private members: Member[];

  constructor(private $http: IHttpService,
              private $q: IQService,
              private $window: IWindowService) {
  }

  all(): IPromise<Member[] | { [id: string]: Array<string> }> {
    let deffered = this.$q.defer();

    if (this.members) {
      deffered.resolve(this.members);
    } else {
      this.$http.get(this.$window.urls.membersUrl)
        .then((c: IHttpPromiseCallbackArg<HttpResponse>) => {
          this.members = c.data.result;
          deffered.resolve(c.data.result);
        }).catch((c: IHttpPromiseCallbackArg<HttpResponse>) => {
          deffered.reject(c.data.error);
        });      
    }

    return deffered.promise;
  }

  reset(): void {
    this.members = undefined;
  };

  static getInstance($http: IHttpService, $q: IQService, $window: IWindowService): IMembersFactory {
    return new MembersFactory($http, $q, $window);
  }
}