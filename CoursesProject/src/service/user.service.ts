// import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
// import { Injectable, Input } from '@angular/core';
// import { User } from '../models/userType';
// import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
// import { baseUrl } from './url'
// import { Observable } from 'rxjs/internal/Observable';
// import { catchError, throwError } from 'rxjs';
// import { error } from 'console';

// @Injectable({
//   providedIn: 'root'
// })
// export class UserService {

//   private userSubject = new BehaviorSubject<User | null>(null);
//   user$ = this.userSubject.asObservable();

//   setUser(user: User) {
//     this.userSubject.next(user);
//   }
//   clearUsers() {
//     this.userSubject.next(null);
//   }

//   constructor(private http: HttpClient) { }

//   private createAuthorizationHeader(token: string): HttpHeaders {
//     return new HttpHeaders({
//       'Authorization': `Bearer ${token}`
//     });
//   }
//   getUsers(token: string): Observable<User[]> {
//     return this.http.get<User[]>(`${baseUrl}/users`, { headers: this.createAuthorizationHeader(token) }).pipe(
//       catchError(error => this.handleError(error, 'fetching users'))
//     );
//   }
//   getUserById(id: number,token:string): Observable<User> {
//     return this.http.get<User>(`${baseUrl}/users/${id}`, {headers: this.createAuthorizationHeader(token)}).pipe(
//       catchError(error=>this.handleError(error,`fetching user with id: ${id}`))
//     )
//   }

//   updateUser(id:number, user: User,token:string):Observable<User> {
//     return this.http.put<User>(`${baseUrl}/users/${user.id}`, JSON.stringify(user),{headers: this.createAuthorizationHeader(token)}).pipe(
//       catchError(error=>this.handleError(error,`updating user with id: ${id}`))
//     )
//   }
//   deleteUser(id: number,token:string):Observable<void> {
//     return this.http.delete<void>(`${baseUrl}/users/${id}`,{headers: this.createAuthorizationHeader(token)}).pipe(
//       catchError(error=>this.handleError(error,`deleting user with id: ${id}`))
//     )
//   }

//   private handleError(error:any,operation:string){
//     console.error(`Error: ${operation}: `,error);
//     return throwError('something worng...');
//   }
// }
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Injectable, Input } from '@angular/core';
import { User } from '../models/userType';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { baseUrl } from './url'
import { Observable } from 'rxjs/internal/Observable';
import { catchError, throwError } from 'rxjs';
import { error } from 'console';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userSubject = new BehaviorSubject<User | null>(null);
  user$ = this.userSubject.asObservable();
  
  setUser(user: User) {
    this.userSubject.next(user);
  }
  clearUsers() {
    this.userSubject.next(null);
  }

  constructor(private http: HttpClient) { }

  
  getUsers(token: string): Observable<User[]> {
    return this.http.get<User[]>(`${baseUrl}/users`);
  }
  getUserById(id: number,token:string): Observable<User> {
    return this.http.get<User>(`${baseUrl}/users/${id}`);
  }

  updateUser(id:number, user: User,token:string):Observable<User> {
    return this.http.put<User>(`${baseUrl}/users/${user.id}`, JSON.stringify(user));
  }
  deleteUser(id: number,token:string):Observable<void> {
    return this.http.delete<void>(`${baseUrl}/users/${id}`);  }

  
}
