import {IPromise, IQService, IHttpPromiseCallbackArg, IHttpService} from 'angular';
import {HttpResponse} from '../models/HttpResponse';
import {Member} from '../../common/models/Member';

export interface IMembersFactory {
  all(): IPromise<Member[] | { [id: string]: Array<string> }>;
  get(id: number): IPromise<Member | { [id: string]: Array<string> }>;
  post(member: Member): IPromise<Member | { [id: string]: Array<string> }>;
  patch(member: Member): IPromise<Member | { [id: string]: Array<string> }>;
  reset(): void;
}

export class MembersFactory implements IMembersFactory {
  static $inject = ['$http', '$httpParamSerializer', '$q'];

  private members: Member[];

  constructor(private $http: IHttpService,
              private $q: IQService) {
  }

  all(): IPromise<Member[] | { [id: string]: Array<string> }> {
    let deffered = this.$q.defer();

    if (this.members) {
      deffered.resolve(this.members);
    } else {
      this.$http.get('/api/members/all')
        .then((c: IHttpPromiseCallbackArg<HttpResponse>) => {
          this.members = c.data.result;
          deffered.resolve(c.data.result);
        }).catch((c: IHttpPromiseCallbackArg<HttpResponse>) => {
          deffered.reject(c.data.error);
        });      
    }

    return deffered.promise;
  };

  get(id: number): IPromise<Member | { [id: string]: Array<string> }> {
    let deffered = this.$q.defer(),
        data: string;

    if (this.members && this.members.find((member: Member) => { return member.id == id })) {
      deffered.resolve(this.members.find((member: Member) => { return member.id == id }));
    } else {
      this.$http.get('/api/members/get/' + id)
        .then((c: IHttpPromiseCallbackArg<HttpResponse>) => {
          deffered.resolve(c.data.result);
        }).catch((c: IHttpPromiseCallbackArg<HttpResponse>) => {
          deffered.reject(c.data.error);
        });      
    }

    return deffered.promise;
  };

  post(member: Member): IPromise<Member | { [id: string]: Array<string> }> {
    return this.$http.post('/api/members/post', member)
      .then((c: IHttpPromiseCallbackArg<HttpResponse>) => {
        return c.data.result;
      }).catch((c: IHttpPromiseCallbackArg<HttpResponse>) => {
        throw c.data.error;
      });      
  };

  patch(member: Member): IPromise<Member | { [id: string]: Array<string> }> {
    return this.$http.patch('/api/members/patch', member)
      .then((c: IHttpPromiseCallbackArg<HttpResponse>) => {
        return c.data.result;
      }).catch((c: IHttpPromiseCallbackArg<HttpResponse>) => {
        throw c.data.error;
      });      
  };

  reset(): void {
    this.members = undefined;
  };

  static getInstance($http: IHttpService, $q: IQService): IMembersFactory {
    return new MembersFactory($http, $q);
  }
}