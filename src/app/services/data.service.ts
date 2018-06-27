import { BadRequestError } from '../common/bad-request-error';
import { NotFoundError } from '../common/not-found-error';
import { AppError } from '../common/app-error';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map,catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class DataService {

    constructor(private http: HttpClient, private url: string) { }
    getAll() {
        return this.http.get(this.url).
        pipe(map((response) => response),catchError(this.handleError));
    }

    getOne(id) {
        return this.http.get(this.url + '/' + id).
        pipe(map((response) => response),catchError(this.handleError));
    }

    create(resource) {
        return this.http.post(this.url, resource).
        pipe(map((response) => response),catchError(this.handleError));
    }

    update(resource) {
        console.log(typeof (resource));
        let id: string = "";
        if(resource._id)
        id=resource._id
        else
        id=resource.get("_id");

        return this.http.put(
            this.url + '/' + id, resource).
            pipe(map((response) => response),catchError(this.handleError));
    }

    delete(resource) {
        return this.http.delete(this.url + '/' + resource._id)
            .pipe(map((response) => response),catchError(this.handleError));
    }
    private handleError(error: Response) {
        if (error.status === 404) {
            return Observable.throw(new NotFoundError());
        }
        if (error.status === 400) {
            return Observable.throw(new BadRequestError(error.json()));
        }
        return Observable.throw(new AppError(error));
    }
}
