import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {ReactiveFormsModule} from '@angular/forms';
import { AppComponent } from './app.component';
import { UserFormComponent } from './user-manager/user-form/user-form.component';
import { UserListComponent } from './user-manager/user-list/user-list.component';
import {UserService} from './service/user.service';
import {MessageService} from './service/message.service';
import {RouterModule, Routes} from '@angular/router';
import { UserUpdateComponent } from './user-update/user-update.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { UserManagerComponent } from './user-manager/user-manager.component';

const routes : Routes = [
  { path : '', redirectTo : '/userManager', pathMatch : 'full'},
  {path : 'userManager', component : UserManagerComponent},  
  {path : 'userList', component : UserListComponent},
  {path : 'addUser', component : UserFormComponent},
  {path : 'update/:id', component: UserUpdateComponent}
]
@NgModule({
  declarations: [
    AppComponent,
    UserFormComponent,
    UserListComponent,
    UserUpdateComponent,
    NavMenuComponent,
    UserManagerComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    UserService,
    MessageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
