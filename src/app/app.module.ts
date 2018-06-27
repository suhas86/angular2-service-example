import {BrowserModule} from '@angular/platform-browser';
import {NgModule, ErrorHandler} from '@angular/core';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {AppErrorHandler} from './common/app-error-handler';
import {AppComponent} from './app.component';
import {PostsComponent} from './posts/posts.component';
import {PostService} from './posts/post.service'
import {AuthInterceptor} from "./services/auth.interceptor";
@NgModule({
  declarations: [AppComponent,PostsComponent],
  imports: [
    BrowserModule, HttpClientModule
  ],
  providers: [
    PostService,
    {
      provide: ErrorHandler,
      useClass: AppErrorHandler
    }, {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}