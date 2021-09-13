import { Injectable } from '@angular/core';
import {InMemoryDbService} from "angular-in-memory-web-api";
import {Country, Nationality, User} from "./user";

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const users: User[] = [
      { id: 1, firstName: 'Példa', lastName: 'Elek', nationality: 'Hungarian', momsName: 'Példa Béláné', gender:'Male' , registered:true},
      { id: 2, firstName: 'Példa', lastName: 'Áron', nationality: 'German', momsName: 'Példa Anita' },
      { id: 3, firstName: 'Példa', lastName: 'Viktória', nationality:'British', momsName: 'Példa Áronné' }
    ];
    return {users};
  }

  genId(users: User[]): number {
    return users.length > 0 ? Math.max(...users.map(user => user.id)) + 1 : 1;
  }
}
