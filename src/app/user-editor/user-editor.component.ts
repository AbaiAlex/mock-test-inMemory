import {Component, EventEmitter, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {UserService} from '../user.service';
import { Location} from '@angular/common';
import {ConfirmationService} from 'primeng/api';
import {RxwebValidators} from '@rxweb/reactive-form-validators';
import {User} from '../user';
import {ActivatedRoute} from '@angular/router';

interface Country {
  name: string;
}
@Component({
  selector: 'app-user-editor',
  templateUrl: './user-editor.component.html',
  styleUrls: ['./user-editor.component.css'],
  providers: [ConfirmationService]
})
export class UserEditorComponent implements OnInit{
  user: User;
  selectedCountry: Country ;
  countries: Country[];
  form: FormGroup;
  genderStateOptions: any[];
  selectedStatus: any;
  userStatus: any[] = [{name: 'Done'}, {name: 'New' }, {name: 'In process'}];
  private dateValue: Date;
  userBDate:  Date;

  constructor(private userService: UserService, private formBuilder: FormBuilder,  private location: Location, private confirmationService: ConfirmationService, private router: ActivatedRoute) {

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

  ngOnInit(): void {
    this.reactiveFormBiulder();
    this.getUser();
    this.getCountries();

  }


  reactiveFormBiulder(): void{
    this.form = this.formBuilder.group({
      id: [null],
      firstName: [null, RxwebValidators.required()],
      lastName: [null, RxwebValidators.required()],
      nationality: [null, RxwebValidators.required()],
      momsName: [null, RxwebValidators.required()],
      country: [null],
      registered: [],
      gender: [null, RxwebValidators.oneOf({matchValues: ['Female' , 'Male']})],
      dateOfBirth: [''],
      number: [null],
      status: [null, RxwebValidators.oneOf({matchValues: ['Done' , 'New' , 'In process']})]
    });
  }

  add(): void{
    if (this.form.valid) {
      this.userService.addUser(this.form.value as User)
        .subscribe();
    }
  }

  confirm(): void {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to edit this user?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        if (this.form.valid){
          this.save();
        }
      },
      reject: () => {
      }
    });
  }

  confirm2(): void {
    this.confirmationService.confirm({
      message: 'Do you want to leave without save?',
      header: 'Leave Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.closeEditer();
      },
      reject: () => {
      }
    });
  }
  getUser(): void {
    let id;
    id = +this.router.snapshot.paramMap.get('id');
    this.userService.getUser(id)
      .subscribe(user => {
        this.form.patchValue(user);
        this.selectedStatus = user.status;
      });
  }

  closeEditer(): void {
    this.location.back();
  }
  save(): void {
    if (this.isChanged() && this.isDateChanged()) {
      this.form.patchValue({dateOfBirth: this.form.controls['dateOfBirth'].value.toString() == '' ? "" : this.trimDate(this.form.controls['dateOfBirth'].value.toString()) as unknown as Date});
    }
    this.userService.updateUser(this.form.value as User)
      .subscribe(() => this.closeEditer() );
  }

  private isChanged() {
    return this.form.dirty;
  }
  private isDateChanged() {
    return this.form.controls["dateOfBirth"].dirty;
  }

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
  getCountries(): void {
    this.userService.getCountries()
      .subscribe(countries => this.countries = countries);
  }

}
