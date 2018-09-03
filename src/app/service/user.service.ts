import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../model/user'
@Injectable({
  providedIn: 'root'
})
export class UserService {
  public apiUrl : string ="http://localhost:3000/userDetails";
  public user : User;
  constructor(private http: HttpClient) { }

  addUserService(temp : User) : Observable<User>{
    return this.http.post<User>(this.apiUrl,temp);
  }
  getUserService() : Observable<User[]>{
    return this.http.get<User[]>(this.apiUrl);
  }
  deleteUserService(id:any): Observable<User>{
    return this.http.delete<User>(this.apiUrl + '/' + id);
  }
  getSpecificUser(id:any) : Observable<User>{
    console.log("id",id);
    return this.http.get<User>(this.apiUrl + '/' + id);
  }

}
