import {IPromise, IHttpPromiseCallbackArg, IHttpService, IQService} from 'angular';
import {HttpResponse} from '../models/HttpResponse';

export interface IPigeFactory {
  run(): IPromise<number[] | { [id: string]: Array<string> }>;
  get(): IPromise<number[] | { [id: string]: Array<string> }>;
}

export class PigeFactory implements IPigeFactory {
  static $inject = ['$http'];

  private pige: number[];

  constructor(private $http: IHttpService,
              private $q: IQService) {
  }

  run(): IPromise<number[] | { [id: string]: Array<string> }> {
    return this.$http.get('/api/pige/run').then((c: IHttpPromiseCallbackArg<HttpResponse>) => {
      this.pige = c.data.result;
      return c.data.result;
    }).catch((c: IHttpPromiseCallbackArg<HttpResponse>) => {
      throw c.data.error;
    });
  };

  get(): IPromise<number[] | { [id: string]: Array<string> }> {
    let deffered = this.$q.defer();

    if (this.pige) {
      deffered.resolve(this.pige);
    } else {
      this.$http.get('/api/pige/get').then((c: IHttpPromiseCallbackArg<HttpResponse>) => {
        this.pige = c.data.result;
        deffered.resolve(c.data.result);
      }).catch((c: IHttpPromiseCallbackArg<HttpResponse>) => {
        deffered.reject(c.data.error);
      });
    }

    return deffered.promise;
  };

  static getInstance($http: IHttpService, $q: IQService): IPigeFactory {
    return new PigeFactory($http, $q);
  }
}