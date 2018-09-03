import { Component, OnInit } from '@angular/core';
import {User} from '../model/user';
import {UserService} from '../service/user.service';
import {MessageService} from '../service/message.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  users : User[];
  currentLength : number ;
  constructor(
    private userService : UserService,
    private messageObject : MessageService,
    private router : Router
  ) { }

  ngOnInit() {
    this.getUsers();
    this.messageObject.getMessage().subscribe(()=>{
      this.getUsers();
    });
  }
  getUsers(){
    this.userService.getUserService().subscribe((getUser) => {
      this.users = getUser;
    });
  }
  editUser(id){
    this.router.navigate(['/' + id]);    
  }
  deleteUser(id){
    this.userService.deleteUserService(id).subscribe(()=>{
      this.messageObject.setMessage('DELETE_TASK');
    });
  }
}
