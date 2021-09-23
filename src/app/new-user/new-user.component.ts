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
  //selectedNationalityes: NationalityList []= [];
  form: FormGroup;
  genderStateOptions: GenderList[] = [];
  nationalityFormArray: FormArray;
  private natId: number;
  constructor(private userService: UserService, private formBuilder: FormBuilder,  private location: Location, private confirmationService: ConfirmationService) {
  }
  ngOnInit(): void {
    this.reactiveFormBiulder();
    this.getCountries();
    this.getNationalities();
    this.getGenders();
  }
  reactiveFormBiulder(): void{
    this.nationalityFormArray = this.formBuilder.array([this.formBuilder.group({name: ''})]);
    this.form = this.formBuilder.group({
      id: [],
      firstName: [null, RxwebValidators.required()],
      lastName: [null, RxwebValidators.required()],
      nationality: this.nationalityFormArray,
      momsName: [null, RxwebValidators.required()],
      country: [null],
      registered: [false],
      gender: [null],
      dateOfBirth: [''],
      number: [null],
      status: [null]
    });
  }
  /**Functionality**/
  add(): void{
    if (this.form.valid) {
      this.form.patchValue({dateOfBirth: this.form.controls['dateOfBirth'].value.toString() == '' ? "" : this.trimDate(this.form.controls['dateOfBirth'].value.toString()) as unknown as Date});
      this.userService.addUser(this.form.value as User)
        .subscribe(() => this.closeNewUser());
    }
  }

  closeNewUser(): void {
    this.location.back();
  }

  /**Pop up**/
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

  /**Date formatting**/
  private getMonth(dateInStr: string) {
    switch(dateInStr.substr(4,3)) {
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


  /*private getNationalityFormGroup(nationalityData: NationalityList): FormGroup {
    return this.formBuilder.group({
    name: [nationalityData.name]
    });
  }

  newNationality(nat: string): void{
    this.natId = this.nationalityFormArray.length;
    this.nationalityFormArray.push(this.getNationalityFormGroup({name: nat}));

  }
*/
}
