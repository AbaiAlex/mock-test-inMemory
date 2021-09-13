import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {UserService} from '../user.service';
import {CountryList, GenderList, NationalityList, User} from '../user';
import {FormArray, FormBuilder, FormGroup} from '@angular/forms';
import {RxwebValidators} from '@rxweb/reactive-form-validators';
import { Location } from '@angular/common';
import {ConfirmationService} from 'primeng/api';



@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css'],
  providers: [ConfirmationService]
})

export class NewUserComponent implements OnInit {

  selectedCountry: CountryList;
  countries: CountryList[] = [];
  nationalities: NationalityList[] = [];
  form: FormGroup;
  genderStateOptions: GenderList[] = [];
  nationalityFormArray: FormArray;
  constructor(private userService: UserService, private formBuilder: FormBuilder,  private location: Location, private confirmationService: ConfirmationService) {
  }
  ngOnInit(): void {
    this.reactiveFormBiulder();
    this.getCountries();
    this.getNationalities();
    this.getGenders();
  }
  reactiveFormBiulder(): void{
    this.nationalityFormArray = this.formBuilder.array([]);
    this.form = this.formBuilder.group({
      id: [],
      firstName: [null, RxwebValidators.required()],
      lastName: [null, RxwebValidators.required()],
      nationality: this.nationalityFormArray,
      momsName: [null, RxwebValidators.required()],
      country: [null],
      registered: [false],
      gender: [null],
      dateOfBirth: [null],
      number: [null],
      status: [null]
    });
  }

  add(): void{
    if (this.form.valid) {
      this.userService.addUser(this.form.value as User)
        .subscribe(() => this.closeNewUser());
    }
  }
  confirm(): void {
    if (this.form.valid){
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
  }

  closeNewUser(): void {
    this.location.back();
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

  private getNationalityFormGroup(nationality: NationalityList): FormGroup {
    return this.formBuilder.group({
    name: [nationality.name]
    });
  }


}
