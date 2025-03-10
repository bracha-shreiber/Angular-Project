// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { BehaviorSubject, catchError, Observable, throwError } from 'rxjs';
// import { Course } from '../models/courseType';
// import { baseUrl } from './url';

// @Injectable({
//   providedIn: 'root'
// })
// export class CourseService {
 
//   private courseSubject = new BehaviorSubject<Course[]>([]);
//   course$ = this.courseSubject.asObservable();
  
//   constructor(private http:HttpClient) { }

//   getCourses(){
//      this.http.get<Course[]>(`${baseUrl}/courses`).subscribe(
//       courses=>this.courseSubject.next(courses)
//     );
//   }
//   getCourseById(courseId:number):Observable<Course>{
//     return this.http.get<Course>(`${baseUrl}/courses/${courseId}`)
//   }
//   getCoursesByUserId(userId:number):Observable<Course[]>{
//     return this.http.get<Course[]>(`${baseUrl}/courses/student/${userId}`);
//   }

//   addCourse(course:Partial<Course>):Observable<Course>{
//     return this.http.post<Course>(`${baseUrl}/courses`,course);
//   }
//   updateCourse(id:number,course:Partial<Course>):Observable<Course>{
//     return this.http.put<Course>(`${baseUrl}/courses/${id}`,course);
//   }

//   deleteCorse(id:number):Observable<void>{
//     return this.http.delete<void>(`${baseUrl}/courses/${id}`);
//   }
//   addStudentToCourse(courseId:number, userId:number):Observable<void>{
//     return this.http.post<void>(`${baseUrl}/courses/${courseId}/enroll`,{body:{userId}});
//   }
//   deleteStudentFromCourse(courseId: number, userId: number): Observable<void> {
//     return this.http.delete<void>(`${baseUrl}/courses/${courseId}/unenroll`, {
//         body: { userId } 
//     });
// }
// }

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, throwError } from 'rxjs';
import { Course } from '../models/courseType';
import { baseUrl } from './url';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
 
  private courseSubject = new BehaviorSubject<Course[]>([]);
  course$ = this.courseSubject.asObservable();
  
  constructor(private http: HttpClient) { }

  getCourses() {
    this.http.get<Course[]>(`${baseUrl}/courses`).pipe(
      catchError(this.handleError)
    ).subscribe(
      courses => this.courseSubject.next(courses)
    );
  }

  getCourseById(courseId: number): Observable<Course> {
    return this.http.get<Course>(`${baseUrl}/courses/${courseId}`).pipe(
      catchError(this.handleError)
    );
  }

  getCoursesByUserId(userId: number): Observable<Course[]> {
    return this.http.get<Course[]>(`${baseUrl}/courses/student/${userId}`).pipe(
      catchError(this.handleError)
    );
  }

  addCourse(course: Partial<Course>): Observable<Course> {
    return this.http.post<Course>(`${baseUrl}/courses`, course).pipe(
      catchError(this.handleError)
    );
  }

  updateCourse(id: number, course: Partial<Course>): Observable<Course> {
    return this.http.put<Course>(`${baseUrl}/courses/${id}`, course).pipe(
      catchError(this.handleError)
    );
  }

  deleteCourse(id: number): Observable<void> {
    return this.http.delete<void>(`${baseUrl}/courses/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  addStudentToCourse(courseId: number, userId: number): Observable<void> {
    return this.http.post<void>(`${baseUrl}/courses/${courseId}/enroll`, { userId }).pipe(
      catchError(this.handleError)
    );
  }

  deleteStudentFromCourse(courseId: number, userId: number): Observable<void> {
    return this.http.delete<void>(`${baseUrl}/courses/${courseId}/unenroll`, {
      body: { userId }
    }).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: any) {
    console.error('An error occurred', error); // Log the error to the console
    return throwError('Something went wrong; please try again later.');
  }
}
