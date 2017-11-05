import { BadRequestError } from '../common/bad-request-error';
import { NotFoundError } from '../common/not-found-error';
import { AppError } from '../common/app-error';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

@Injectable()
export class DataService {

  constructor(private http: Http, private url: string) {}
  getAll() {
    return this.http.get(this.url)
    .map(response => response.json())
    .catch(this.handleError);
  }

  create(resource) {
    return this.http.post(this.url, resource)
    .map(response => response.json())
    .catch(this.handleError);
  }

  update(resource) {
    return this.http.patch(
      this.url + '/' + resource.id,
      JSON.stringify({ isRead: true }))
      .map(response => response.json())
      .catch(this.handleError);
  }

  delete(resource) {
    return this.http.delete(this.url + '/' + resource.id)
    .map(response => response.json())
    .catch(this.handleError);
  }

  private handleError(error: Response) {
    if (error.status === 404 ) {
      return Observable.throw(new NotFoundError());
    }
    if (error.status === 400) {
      return Observable.throw(new BadRequestError(error.json()));
    }
    return Observable.throw(new AppError(error));
  }
}
