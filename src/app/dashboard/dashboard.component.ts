import { Component, OnInit } from '@angular/core';
import {UserService} from "../user.service";
import {Country, Gender, Nationality, Status, User} from "../user";
import {FormArray, FormBuilder, FormGroup} from "@angular/forms";
import {RxwebValidators} from "@rxweb/reactive-form-validators";
import {Router} from "@angular/router";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  users: User[] = [];
  filteredUsers:User[];
  selectedUser:User;
  constructor(private userService: UserService, private router: Router) {
  }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(): void {
    this.userService.getUsers()
      .subscribe(users => {this.users = users;
        this.filteredUsers=users;});

  }

  createNewUser(): void{
    this.router.navigateByUrl('newUser').then();
  }


  editUser() {
    if(this.selectedUser){
      this.router.navigateByUrl('detail/' + this.selectedUser.id).then();
    }
  }

  saveChange(user: User) {
      this.userService.updateUser(user)
        .subscribe();
  }

  delete(): void {
    if(this.selectedUser){
      //this.users = this.users.filter(h => h !== this.selectedUser);
      this.userService.deleteUser(this.selectedUser.id).subscribe(() => this.refreshData());
    }
  }
  refreshData(): void{
    this.getUsers();
    console.log('Data refreshed');
  }

  search(userName: string) {
    if(userName){
      this.filteredUsers = this.users.filter(h => h.firstName == userName);
    }
  }
}


