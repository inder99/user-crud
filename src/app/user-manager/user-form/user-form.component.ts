import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {User} from '../../model/user';
import {UserService} from '../../service/user.service';
import {MessageService} from '../../service/message.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {
  getId : number = undefined;
  editBool : boolean = false;
  addUser : FormGroup;
  user : User;
  updateUserDetails : User;
  currentLength : number ;
  constructor(private builder : FormBuilder,
    private route : ActivatedRoute,
    private router : Router,
    private userService : UserService,
    private messageObject : MessageService
  ) { 
  }

  ngOnInit() {
    this.resetField();    
    this.route.params.subscribe((data) => {
      this.getId = data.id;
      if(this.getId === undefined || typeof(this.getId) === undefined){
        this.resetField();
      }else{
        this.updateUser();
      }
    })
  }
  updateUser(){
    this.userService.getSpecificUser(this.getId).subscribe((data)=>{
      this.updateUserDetails = data;
      this.addUser.setValue({
        firstName : data.firstname,
        lastName : data.lastname,
        email : data.email
      });
      this.messageObject.setMessage("Update Task");
      this.editBool = true;
    });
  }
  updating(){
    this.user = {
      id : this.getId,
      firstname : this.addUser.get('firstName').value,
      lastname : this.addUser.get('lastName').value,
      email : this.addUser.get('email').value
    }
    this.userService.updateUser(this.user).subscribe((data)=>{
      this.messageObject.setMessage("Task_Updated");
      console.log("UserUpdated",this.user);
      this.router.navigate(['/']);    
    });
  }
  cancelUpdate(){
    this.editBool=false;
  }
  resetField(){
    this.addUser = this.builder.group({
      firstName : ['', Validators.required],
      lastName : ['', Validators.required],
      email : ['', Validators.required],
    });
  }// resetField() ends here

  adding(){
    this.userService.getUserService().subscribe((getUser) => {
      this.currentLength = getUser.length;
    });

    this.user = {
      id : this.currentLength + 1,
      firstname : this.addUser.get('firstName').value,
      lastname : this.addUser.get('lastName').value,
      email : this.addUser.get('email').value
    }

    this.userService.addUserService(this.user).subscribe((addUser) => {
      this.messageObject.setMessage('ADD_USER');
      this.resetField();
    });
  } // adding() function ends here

}
