import { Injectable } from '@angular/core';
import {InMemoryDbService} from 'angular-in-memory-web-api';
import {CountryList, GenderList, NationalityList, StatusList, User} from './user';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const users: User[] = [
      { id: 1, firstName: 'Példa', lastName: 'Elek', nationality: [{name: 'Hungarian'}], momsName: 'Példa Béláné', gender: 'Male' , registered: true},
      { id: 2, firstName: 'Példa', lastName: 'Áron', nationality: [{name: 'Hungarian'}, { name: 'German'}], momsName: 'Példa Anita' },
      { id: 3, firstName: 'Példa', lastName: 'Viktória', nationality: [{name: 'British'}], momsName: 'Példa Áronné' }
    ];
    const countryList: CountryList[] = [
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
    const nationalityList: NationalityList[] = [
      { name: 'British'},
      { name: 'Hungarian'},
      { name: 'German' }
    ];
    const genderList: GenderList[] = [
      {label: 'Female', value: 'Female'},
      {label: 'Male', value: 'Male'}
    ];
    const statusList: StatusList[] = [
      {status: 'Done'},
      {status: 'New'},
      {status: 'In process'}
    ];
    return {users, countryList, nationalityList, genderList, statusList};
  }
  genId(users: User[]): number {
    return users.length > 0 ? Math.max(...users.map(user => user.id)) + 1 : 1;
  }
}
