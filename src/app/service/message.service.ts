import { Injectable } from '@angular/core';
import {Observable,Subject} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class MessageService {
  subject :Subject<any> = new Subject<any>();
  constructor() { }

  setMessage(msg:string):void{
    this.subject.next({
      msg
    });
  }
  setUserId(id:number):void{
    this.subject.next({
      id
    });
  }
  getMessage(): Observable<any>{
    return this.subject.asObservable();
  }

}
