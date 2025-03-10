import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Lesson } from '../models/lessonType';
import { HttpClient } from '@angular/common/http';
import { Course } from '../models/courseType';
import { baseUrl } from './url';

@Injectable({
  providedIn: 'root'
})
export class LessonService {

  private lessonsSubject = new BehaviorSubject<Lesson[]>([]);
  $lessons = this.lessonsSubject.asObservable();

  constructor(private http:HttpClient) { }

  getLessonsByCourseId(courseId:number){
    return this.http.get<Lesson[]>(`${baseUrl}/courses/${courseId}/lessons`).
    subscribe(lessons=>this.lessonsSubject.next(lessons));
  }

  getLessonById(courseId:number,lessonId:number):Observable<Lesson>{
    return this.http.get<Lesson>(`${baseUrl}/courses/${courseId}/lessons/${lessonId}`);
  }
  addLessonInCourse(title:string,content:string,courseId:number):Observable<Lesson>{
    return this.http.post<Lesson>(`${baseUrl}/courses/${courseId}/lessons`,{title,content,courseId});
  }
  updateLessonById(courseId:number,lessonId:number,lesson:Partial<Lesson>):Observable<Lesson>{
    return this.http.put<Lesson>(`${baseUrl}/courses/${courseId}/lessons/${lessonId}`,lesson);
  }
  deleteLessonById(courseId:number,lessonId:number):Observable<void>{
    return this.http.delete<void>(`${baseUrl}/courses/${courseId}/lessons/${lessonId}`);
  }

}
