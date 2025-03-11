import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, catchError, Observable, tap } from 'rxjs';
import { User } from '../models/userType';
import { response } from 'express';
import { UserService } from './user.service';
import { error, log } from 'console';
import { baseUrl } from './url';

@Injectable({
  providedIn: 'root',
})
export class AuthService {private baseUrl = 'http://localhost:3000/api/auth';

  currentUser:User={id:-1,email:"",name:"",role:"student",password:"",courses:[]}
  token!:string
  private loggedInSubject = new BehaviorSubject<boolean>(false);
  loggedIn$ = this.loggedInSubject.asObservable();
  constructor(private http: HttpClient, private userService: UserService) { }

  register(user: Partial<User>): Observable<User> {
    return this.http.post<User>(`${baseUrl}/auth/register`, user).pipe(
      tap((response:any) => {
        console.log("after", response);
        this.userService.setUser(response);
        this.currentUser = response;
        this.loggedInSubject.next(true);
        // if (typeof window !== 'undefined') {
        //   sessionStorage.setItem('token', response.token);
        // }
      }),catchError(error=>{
        console.error('Error registering user: ',error);
        throw error;
      })
    );
  }
  login(user: Partial<User>): Observable<User> {
    return this.http.post<User>(`${baseUrl}/auth/login`, { email: user.email, password: user.password }).pipe(
        tap((res: any) => {
            this.currentUser.id = res.userId;
            this.currentUser.role = res.role;
            this.token = res.token;
            console.log(this.token);
            console.log(this.currentUser);
            this.loggedInSubject.next(true);
            // if (typeof window !== 'undefined') {
            //   sessionStorage.setItem('token', res.token);
            // }
        }),
        catchError(error => {
            console.error('Error logging in user: ', error);
            throw error;
        })
    );
}
logout() {
      this.currentUser = { id: -1, email: "", name: "", role: "student", password: "", courses: [] };
      this.token = '';
      this.loggedInSubject.next(false); // Update logged-out status
    }
}
// // import { Injectable } from '@angular/core';
// // import { HttpClient } from '@angular/common/http';
// // import { catchError, Observable, tap } from 'rxjs';
// // import { User } from '../models/userType';
// // import { response } from 'express';
// // import { UserService } from './user.service';
// // import { error, log } from 'console';
// // import { baseUrl } from './url';

// // @Injectable({
// //   providedIn: 'root',
// // })
// // export class AuthService {private baseUrl = 'http://localhost:3000/api/auth';

// //   constructor(private http: HttpClient, private userService: UserService) { }

// //   // register(user: Partial<User>): Observable<User> {
// //   //   return this.http.post<User>(`${baseUrl}/auth/register`, user);
      
// //   // }
// //   // login(user: Partial<User>): Observable<{token:string}> {
// //   //   return this.http.post<{token:string}>(`${baseUrl}/auth/login`, {email:user.email,password:user.password});
// //   // }
// //   register(user: User): Observable<any> {
// //     // this.currentUser = user;
// //     return this.http.post(`${baseUrl}/register`, user);
// //   }

// //   login(credentials: { email: string; password: string }): Observable<any> {
// //     return this.http.post(`${baseUrl}/login`, credentials);
// //   }
// // }

// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { catchError, Observable, tap, BehaviorSubject } from 'rxjs';
// import { User } from '../models/userType';
// import { UserService } from './user.service';
// import { baseUrl } from './url';

// @Injectable({
//   providedIn: 'root',
// })
// export class AuthService {
//   private baseUrl = 'http://localhost:3000/api/auth';
//   private loggedInSubject = new BehaviorSubject<boolean>(false);
//   loggedIn$ = this.loggedInSubject.asObservable();

//   currentUser: User = { id: -1, email: "", name: "", role: "student", password: "", courses: [] };
//   token!: string;

//   constructor(private http: HttpClient, private userService: UserService) { }

//   register(user: Partial<User>): Observable<User> {
//     return this.http.post<User>(`${this.baseUrl}/auth/register`, user).pipe(
//       tap(response => {
//         console.log("after", response);
//         this.userService.setUser(response);
//         this.currentUser = response;
//         this.loggedInSubject.next(true); // Update logged-in status
//       }),
//       catchError(error => {
//         console.error('Error registering user: ', error);
//         throw error;
//       })
//     );
//   }

//   login(user: Partial<User>): Observable<User> {
//     return this.http.post<User>(`${this.baseUrl}/auth/login`, { email: user.email, password: user.password }).pipe(
//       tap((res: any) => {
//         this.currentUser.id = res.userId;
//         this.currentUser.role = res.role;
//         this.token = res.token;
//         console.log(this.token);
//         console.log(this.currentUser);
//         this.loggedInSubject.next(true); // Update logged-in status
//       }),
//       catchError(error => {
//         console.error('Error logging in user: ', error);
//         throw error;
//       })
//     );
//   }

//   logout() {
//     this.currentUser = { id: -1, email: "", name: "", role: "student", password: "", courses: [] };
//     this.token = '';
//     this.loggedInSubject.next(false); // Update logged-out status
//   }
// }

