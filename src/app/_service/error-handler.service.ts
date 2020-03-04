import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  public errorObj: BehaviorSubject<boolean>;

    constructor() {
        this.errorObj = new BehaviorSubject<boolean>(false);
    }
}
