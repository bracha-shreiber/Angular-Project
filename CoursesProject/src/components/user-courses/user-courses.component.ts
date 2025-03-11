import { Component, OnInit } from '@angular/core';
import { CourseService } from '../../service/course.service';
import { AuthService } from '../../service/auth.service';
import { Course } from '../../models/courseType';
import { AsyncPipe } from '@angular/common';
import { Router } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
@Component({
  selector: 'app-user-courses',
  standalone: true,
  imports: [MatButtonModule,MatToolbarModule],
  templateUrl: './user-courses.component.html',
  styleUrl: './user-courses.component.css'
})
export class UserCoursesComponent implements OnInit{
  myCourses:Course[]=[]
  userId:number=0;
  userRole:string='';
  constructor(private coursesService:CourseService,private authService:AuthService,private router:Router){}
  ngOnInit(): void {
this.userId=this.authService.currentUser.id
this.userRole=this.authService.currentUser.role
this.coursesService.getCoursesByUserId(this.userId).subscribe(
  (data)=>{this.myCourses=data}
)
//this.myCourses=this.authService.currentUser.courses
  }
  addCourse() {
    this.router.navigate(["courses/newCourse"])
  }
  isEnroll(courseId: number): boolean {
    return this.myCourses.some(course => course.id === courseId);
  }

  deleteCourse(courseId: number) {
    this.coursesService.deleteCourse(courseId)
    this.coursesService.getCoursesByUserId(this.userId).subscribe(
      (data)=>{this.myCourses=data}
    )
    //this.coursesService.getCoursesByUserId(this.userId)
  }

  editCourse(courseId: number) {
    const course = this.coursesService.getCourseById(courseId).subscribe(
      (course: Course) => {
        const c = { ...course }
        sessionStorage.setItem('course', JSON.stringify(c));
        this.coursesService.getCourses()
        this.coursesService.getCourses()
        this.router.navigate([`/courses/${courseId}/edit`])
      }, (error) => {
        console.error("not success to edit course",error)
      }
    )
  }
  showLessons(courseId: number) {
    this.router.navigate([`/courses/${courseId}/lessons`])
  }
  signOut() {
    this.authService.logout(); 
    this.router.navigate(['/'])
  }
  ToCourses(){
    this.router.navigate(['courses'])
  }
  
}
