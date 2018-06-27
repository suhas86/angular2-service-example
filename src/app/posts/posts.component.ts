import { BadRequestError } from '../common/bad-request-error';
import { NotFoundError } from '../common/not-found-error';
import { AppError } from '../common/app-error';
import { PostService } from './post.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  posts: any;

  constructor(private service: PostService) {}

  ngOnInit() {
    this.service.getAll().subscribe(posts => this.posts = posts);
  }

  createPost(title: HTMLInputElement) {
    const post = { title: title.value };
    this.service.create(post).subscribe(
      response => {
        title.value = '';
      //  post['id'] = response.id;
        this.posts.splice(0, 0, post);
      },
      (error: AppError) => {
        if (error instanceof BadRequestError) {
          //          This will set error on form
          //          this.form.setErrors(error.originalError);
        } else {
          throw error;
        }
      }
    );
  }
  updatePost(post) {
    this.service.update(post).subscribe(response => console.log(response));
  }
  deletePost(post) {
    this.service.delete(post).subscribe(
      response => {
        const index = this.posts.indexOf(post);
        this.posts.splice(index, 1);
      },
      (error: AppError) => {
        if (error instanceof NotFoundError) {
          alert('This post has already been deleted');
        } else {
          throw error;
        }
      }
    );
  }
}
