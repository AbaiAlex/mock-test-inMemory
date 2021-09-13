import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import {CountryList, GenderList, NationalityList, User} from './user';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor( private http: HttpClient) { }
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  private usersUrl = 'api/users';  // URL to web api
  private countryUrl = 'api/countryList';
  private nationalityUrl = 'api/nationalityList';
  private genderUrl = 'api/genderList';
  /*getDogs(): Observable<Dog[]> {
    const dogs = of(DOGS);
    return dogs;
  }*/
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.usersUrl);
  }
  getCountries(): Observable<CountryList[]> {
    return this.http.get<CountryList[]>(this.countryUrl);
  }
  getNationalities(): Observable<NationalityList[]> {
    return this.http.get<NationalityList[]>(this.nationalityUrl);
  }
  getGenderList(): Observable<GenderList[]> {
    return this.http.get<GenderList[]>(this.genderUrl);
  }
  getUser(id: number): Observable<User> {
    const url = `${this.usersUrl}/${id}`;
    return this.http.get<User>(url);
  }

  /*UPDATE*/
  updateUser(user: User): Observable<any> {
    console.log(user);
    return this.http.put(this.usersUrl, user, this.httpOptions);
  }

  /*Create*/
  addUser(user: User): Observable<User> {
    return this.http.post<User>(this.usersUrl, user, this.httpOptions);
  }
  /*Delete*/
  deleteUser(id: number): Observable<User> {
    const url = `${this.usersUrl}/${id}`;
    return this.http.delete<User>(url, this.httpOptions);
  }

}
