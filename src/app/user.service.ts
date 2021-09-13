import { Injectable } from '@angular/core';
import {Observable, of} from "rxjs";
import {Country, Nationality, User} from "./user";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor( private http: HttpClient) { }
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  private usersUrl = 'api/users';  // URL to web api
  /*getDogs(): Observable<Dog[]> {
    const dogs = of(DOGS);
    return dogs;
  }*/
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.usersUrl);
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
