import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private subject = new Subject<any>();

  sendMessage(message: string) {
    console.log('In service .... ' +message)
    this.subject.next({ text: message });
  }

  clearMessages() {
    this.subject.next();
  }

  getMessage(): Observable<any> {
    console.log('In service .Observable... ' )
    return this.subject.asObservable();
  }
}
