import { DataService } from '../services/data.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable()
export class PostService extends DataService {

  constructor( http: HttpClient) {
    super(http, 'http://jsonplaceholder.typicode.com/posts');
  }
}
