import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {UserService} from "../user.service";
import {Location} from "@angular/common";
import {ConfirmationService} from "primeng/api";
import {RxwebValidators} from "@rxweb/reactive-form-validators";
import {User} from "../user";
interface Country {
  name: string,
  code: string
}
@Component({
  selector: 'app-user-editor',
  templateUrl: './user-editor.component.html',
  styleUrls: ['./user-editor.component.css']
})
export class UserEditorComponent implements OnInit {

  date: Date;
  selectedCountry: Country ;
  countries: Country[];
  form: FormGroup;
  genderStateOptions: any[];
  constructor(private userService: UserService, private formBuilder: FormBuilder,  private location: Location, private confirmationService: ConfirmationService) {
    this.genderStateOptions = [{label: 'Female', value: 'Female'}, {label: 'Male', value: 'Male'}];
    this.countries = [
      {name: 'Australia', code: 'AU'},
      {name: 'Brazil', code: 'BR'},
      {name: 'China', code: 'CN'},
      {name: 'Egypt', code: 'EG'},
      {name: 'France', code: 'FR'},
      {name: 'Germany', code: 'DE'},
      {name: 'India', code: 'IN'},
      {name: 'Japan', code: 'JP'},
      {name: 'Spain', code: 'ES'},
      {name: 'United States', code: 'US'}
    ];
  }
  @Output()
  onClose = new EventEmitter<boolean>();
  ngOnInit(): void {
    this.reactiveFormBiulder();
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
        .subscribe();
    }
  }
  confirm(event: Event) {
    this.confirmationService.confirm({
      target: event.target,
      message: 'Are you sure that you want to make a new user?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        if(this.selectedCountry){
          this.add();
        }
        else{
          this.add();
        }

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
