import { Component, OnInit } from '@angular/core';
import {UserService} from '../user.service';
import {User, CountryList, GenderList, NationalityList} from '../user';
import {Router} from '@angular/router';
import {ConfirmationService} from 'primeng/api';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [ConfirmationService]
})
export class DashboardComponent implements OnInit {
  users: User[] = [];
  filteredUsers: User[];
  selectedUser: User;
  countries: CountryList[] = [];
  nationalities: NationalityList[] = [];
  genderStateOptions: GenderList[] = [];

  constructor(private userService: UserService, private router: Router, private confirmationService: ConfirmationService) {
  }

  ngOnInit(): void {
    this.getUsers();
    this.getGenders();
    this.getNationalities();
    this.getCountries();
  }

  getUsers(): void {
    this.userService.getUsers()
      .subscribe(users => {this.users = users;
                           this.filteredUsers = users; });

  }

  createNewUser(): void{
    this.router.navigateByUrl('newUser').then();
  }


  editUser(): void {
    if (this.selectedUser){
      this.router.navigateByUrl('detail/' + this.selectedUser.id).then();
    }
  }

  saveChange(user: User): void {
      this.userService.updateUser(user)
        .subscribe();
  }

  delete(): void {
    if (this.selectedUser){
      this.confirmationService.confirm({
        message: 'Do you want to delete this user?',
        header: 'Delete Confirmation',
        icon: 'pi pi-info-circle',
        accept: () => {
          this.userService.deleteUser(this.selectedUser.id).subscribe(() => this.refreshData());
        },
        reject: () => {
        }
      });
    }
  }
  refreshData(): void{
    this.getUsers();
    console.log('Data refreshed');
  }

  search(FName: string, LName: string, MomName: string, Numb: string): void {
    this.filteredUsers = this.users;
    this.filteredUsers = this.filteredUsers.filter(h => h.firstName.toLowerCase().indexOf(FName.toLowerCase()) !== -1);
    this.filteredUsers = this.filteredUsers.filter(h => h.lastName.toLowerCase().indexOf(LName.toLowerCase()) !== -1);
    this.filteredUsers = this.filteredUsers.filter(h => h.momsName.toLowerCase().indexOf(MomName.toLowerCase()) !== -1);
    this.filteredUsers = this.filteredUsers.filter(h => String(h.number).indexOf(Numb) !== -1 );
  }

  getCountries(): void {
    this.userService.getCountries()
      .subscribe(countries => this.countries = countries);
  }
  getNationalities(): void {
    this.userService.getNationalities()
      .subscribe(nat => this.nationalities = nat);
  }
  getGenders(): void {
    this.userService.getGenderList()
      .subscribe(gen => this.genderStateOptions = gen);
  }
}


