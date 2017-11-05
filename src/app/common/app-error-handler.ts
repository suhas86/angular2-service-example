import { ErrorHandler } from '@angular/core';
export class AppErrorHandler implements ErrorHandler {

  handleError(error: any) {
    alert('An unexpected error has occured');
    console.log(error);
  }

}
