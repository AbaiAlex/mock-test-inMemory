import { Component, OnInit } from '@angular/core';
import {UserService} from '../user.service';
import {User, CountryList, GenderList, NationalityList, StatusList} from '../user';
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
  userNationalities: string[];
  filteredUsers: User[];
  selectedUser: User;
  countries: CountryList[] = [];
  selectedCountry: CountryList;
  nationalities: NationalityList[] = [];
  genderStateOptions: GenderList[] = [];
  selectedGender: GenderList;
  statusStateOptions: StatusList[] = [];
  selectedState: StatusList;
  selectedRegisteredState = null;
  checked: boolean = false;
  selectedBirthDay: any =null;
  displayWarning: boolean;
  constructor(private userService: UserService, private router: Router, private confirmationService: ConfirmationService) {
  }

  ngOnInit(): void {
    this.getUsers();
    this.getGenders();
    this.getNationalities();
    this.getCountries();
    this.getStatus();
  }

  /**Functionality**/

  createNewUser(): void{
    this.router.navigateByUrl('newUser').then();
  }


  editUser(): void {
    if (this.selectedUser){
      this.router.navigateByUrl('detail/' + this.selectedUser.id).then();
    }else{
      this.displayWarning=true;
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

  search(FName: string, LName: string, MomName: string, Numb: string, Country: CountryList, Gender: GenderList, Status: StatusList, Registered: any, Nationality: string, BirthDay: any): void {
    this.filteredUsers = this.users;
    this.filteredUsers = this.filteredUsers.filter(h => h.firstName.toLowerCase().indexOf(FName.toLowerCase()) !== -1);
    this.filteredUsers = this.filteredUsers.filter(h => h.lastName.toLowerCase().indexOf(LName.toLowerCase()) !== -1);
    /*this.filteredUsers = this.filteredUsers.filter(h => h.nationality.filter(h => h.name.toString().toLowerCase().indexOf(Nationality.toLowerCase()) !==1 ));*/
    this.filteredUsers = this.filteredUsers.filter(h => h.momsName.toLowerCase().indexOf(MomName.toLowerCase()) !== -1);
    this.filteredUsers = this.filteredUsers.filter(h => String(h.number).indexOf(Numb) !== -1);
    if (Country) {
      this.filteredUsers = this.filteredUsers.filter(h => String(h.country) === String(Country.name));
    }
    if (Gender) {
      this.filteredUsers = this.filteredUsers.filter(h => String(h.gender) === String(Gender.value));
    }
    if (Status) {
      this.filteredUsers = this.filteredUsers.filter(h => String(h.status) === String(Status.status));
    }
    if (Registered !== null) {
      this.filteredUsers = this.filteredUsers.filter(h => String(h.registered) === String(Registered));
    }
    if(BirthDay !== null){
      BirthDay = this.selectedBirthDay.toString() == '' ? "" : this.trimDate(this.selectedBirthDay.toString());
      this.filteredUsers = this.filteredUsers.filter(h => h.dateOfBirth === BirthDay);

    }

  }

  /**Date formatting**/
  private getMonth(dateInStr: string){
    switch(dateInStr.substr(4,3)){
      case "Jan": {
        return "01";
      }
      case "Feb": {
        return "02";
      }
      case "Mar": {
        return "03";
      }
      case "Apr": {
        return "04";
      }
      case "May": {
        return "05";
      }
      case "Jun": {
        return "06";
      }
      case "Jul": {
        return "07";
      }
      case "Aug": {
        return "08";
      }
      case "Sep": {
        return "09";
      }
      case "Oct": {
        return "10";
      }
      case "Nov": {
        return "11";
      }

      default: {
        return '12'
      }
    }
  }
  private trimDate(dateInStr: string) {
    let okDate: string;
    okDate = this.getMonth(dateInStr) + '/' + dateInStr.substr(8, 2) + '/' + dateInStr.substr(11,4)
    return okDate;
  }
  /**Get data from in memory**/
  getUsers(): void {
    this.userService.getUsers()
      .subscribe(users => {this.users = users;
        this.filteredUsers = users;
      });

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
  getStatus(): void{
    this.userService.getStatusState()
      .subscribe(stat => this.statusStateOptions = stat);
  }


}
