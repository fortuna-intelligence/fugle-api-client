import axios, { AxiosPromise } from 'axios';
import qs from 'qs';

export interface FugleOptions {
  apiToken?: string;
}

export class Fugle {
  private static BASE_REALTIME_URL = 'https://api.fugle.tw/realtime';
  private static VERSION = 'v0';
  private _apiToken: string;

  constructor(options: FugleOptions = {}) {
    this._apiToken = options.apiToken || '';
  }

  get apiToken(): string {
    return this._apiToken;
  }

  set apiToken(value) {
    this._apiToken = value;
  }

  public api(path: string, params: object): AxiosPromise {
    const url = this.compileUrl(path, params);
    return axios(url);
  }

  private compileUrl(path: string, params: object): string {
    params = { apiToken: this.apiToken, ...params };

    const baseUrl = Fugle.BASE_REALTIME_URL + '/' + Fugle.VERSION;
    const endpoint = (path.indexOf('/') === 0) ? path : '/' + path;
    const query = '?' + qs.stringify(params);

    return baseUrl + endpoint + query;
  }
}
