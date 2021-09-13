import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {UserService} from "../user.service";
import { User} from "../user";
import {FormBuilder, FormGroup} from "@angular/forms";
import {RxwebValidators} from "@rxweb/reactive-form-validators";
import { Location } from '@angular/common';
import {ConfirmationService} from "primeng/api";

interface Country {
  name: string
}

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css'],
  providers: [ConfirmationService]
})

export class NewUserComponent implements OnInit {
  date: Date;
  selectedCountry: Country;
  countries: Country[];
  form: FormGroup;
  genderStateOptions: any[];
  constructor(private userService: UserService, private formBuilder: FormBuilder,  private location: Location, private confirmationService: ConfirmationService) {
    this.genderStateOptions = [{label: 'Female', value: 'Female'}, {label: 'Male', value: 'Male'}];
    this.countries = [
      {name: 'Australia'},
      {name: 'Brazil'},
      {name: 'China'},
      {name: 'Egypt'},
      {name: 'France'},
      {name: 'Germany'},
      {name: 'India'},
      {name: 'Japan'},
      {name: 'Spain'},
      {name: 'United States'}
    ];
  }
  @Output()
  onClose = new EventEmitter<boolean>();
  ngOnInit(): void {
    this.reactiveFormBiulder();
    //this.selectedCountry = {name: ''};
  }
  reactiveFormBiulder(): void{
    this.form = this.formBuilder.group({
      id: [],
      firstName: [null, RxwebValidators.required()],
      lastName: [null, RxwebValidators.required()],
      nationality: [null, RxwebValidators.required()],
      momsName: [null, RxwebValidators.required()],
      country: [],
      registered: [],
      gender: [null, RxwebValidators.oneOf({matchValues: ['Female' , 'Male']})],
      dateOfBirth:[],
      number: [],
      status:[null, RxwebValidators.oneOf({matchValues: ['Done' ,'New', 'In process']})]
    });
  }
/*
  add(firstName: string, lastName: string, nationality: string, momsName: string, country:string, registered:boolean, gender: string): void {
    firstName = firstName.trim();
    lastName = lastName.trim();
    nationality = nationality.trim();
    momsName = momsName.trim();
    country = country.trim();
    gender = gender.trim();
    if (!firstName && !lastName && !nationality && !momsName) { return; }
    this.userService.addUser({ firstName, lastName, nationality, momsName, country , registered, gender} as User)
      .subscribe(() => this.closeCreate());
  }

 */
  add():void{
    if (this.form.valid) {
      this.userService.addUser(this.form.value as User)
        .subscribe(() => this.closeNewUser());
    }
  }
  confirm() {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to make this new user?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
       this.add();
      },
      reject: () => {

      }
    });
  }

  getDogs(): void {
    this.userService.getUsers()
      .subscribe();
  }

  closeNewUser(): void {
    this.location.back();
  }


}
