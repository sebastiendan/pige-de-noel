import {IPromise, IHttpPromiseCallbackArg, IHttpService, IWindowService} from 'angular';
import {HttpResponse} from '../models/HttpResponse';
import {Pige} from '../models/Pige';

export interface IPigeFactory {
  get(): IPromise<Pige | { [id: string]: Array<string> }>;
}

export class PigeFactory implements IPigeFactory {
  static $inject = ['$http'];

  constructor(private $http: IHttpService,
              private $window: IWindowService) {
  }

  get(): IPromise<Pige | { [id: string]: Array<string> }> {
    return this.$http.get(this.$window.urls.pigeUrl).then((c: IHttpPromiseCallbackArg<HttpResponse>) => {
      return c.data.result;
    }).catch((c: IHttpPromiseCallbackArg<HttpResponse>) => {
      throw c.data.error;
    });
  }

  static getInstance($http: IHttpService, $window: IWindowService): IPigeFactory {
    return new PigeFactory($http, $window);
  }
}