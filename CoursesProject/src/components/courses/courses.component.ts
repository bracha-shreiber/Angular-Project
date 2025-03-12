import { Component, Input, OnInit } from '@angular/core';
import { Course } from '../../models/courseType';
import { CourseService } from '../../service/course.service';
import { LessonService } from '../../service/lesson.service';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [AsyncPipe,MatButtonModule,MatToolbarModule],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.css'
})
export class CoursesComponent implements OnInit {
  courses: Observable<Course[]> | undefined;
  studentCourses: Course[] = [];
  errorMessage: string = "";
  userRole: string = "student"
  constructor(private coursesService: CourseService, private lessonsService: LessonService, private router: Router, private authService: AuthService) {
  }
  ngOnInit(): void {
    this.coursesService.getCourses();
    this.courses = this.coursesService.course$
    this.userRole = this.authService.currentUser.role;
    this.coursesService.getCoursesByUserId(this.authService.currentUser.id).subscribe(
      {
        next: (courses) => {
          this.studentCourses = courses;
        },
        error: (error) => {
          console.error('Error fetching courses by userId', error);
        }
      }
    )
  }
  
  addCourse() {
    this.router.navigate(["courses/newCourse"])
  }
  enroll(courseId: number) {
    this.coursesService.addStudentToCourse(courseId, this.authService.currentUser.id).subscribe({
      next: (response) => {
        console.log("success enroll", response)
        this.coursesService.getCourses();
        this.coursesService.getCourses();
        this.coursesService.getCourseById(courseId).subscribe(
          {
            next: (course) => {
              this.studentCourses.push(course)
            }, error: (error) => {
              console.error('Error retrieve course ', error)
            }

          }
        )
      }, error: (error) => {
        this.errorMessage = "not success to enroll"
      }
    }
    );
  }
  unenroll(courseId: number) {
    this.coursesService.deleteStudentFromCourse(courseId, this.authService.currentUser.id).subscribe(
      {
        next: (response) => {
          console.log("success leave", response)
          this.studentCourses = this.studentCourses.filter(course => course.id !== courseId);
          this.coursesService.getCourses()
        }, error: (error) => {
          this.errorMessage = "not success to leave"
        }
      }
    );
  }
  isEnroll(courseId: number): boolean {
    return this.studentCourses.some(course => course.id === courseId);
  }

  deleteCourse(courseId: number) {
    this.coursesService.deleteCourse(courseId)
    this.coursesService.getCourses()
    this.coursesService.getCourses()
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
        this.errorMessage = "not success to edit course"
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
  ToMyCourses(){
    this.router.navigate(['courses/myCourses'])
  }
}

// import { Component, OnInit } from '@angular/core';
// import { Course } from '../../models/courseType';
// import { CourseService } from '../../service/course.service';
// import { LessonService } from '../../service/lesson.service';
// import { MatDialog } from '@angular/material/dialog';
// import { DialogComponent } from '../dialog/dialog.component';

// @Component({
//   selector: 'app-courses',
//   standalone: true,
//   imports: [],
//   templateUrl: './courses.component.html',
//   styleUrls: ['./courses.component.css']
// })
// export class CoursesComponent implements OnInit {
//   courses: Course[] = [];
//   userId: number =  Number(sessionStorage.getItem('userId'));
//   role:string | null = sessionStorage.getItem('role')?JSON.stringify(sessionStorage.getItem('role')):null
//   errorMessage: string = "";

//   constructor(
//     private coursesService: CourseService,
//     private lessonsService: LessonService,
//     public dialog: MatDialog
//   ) {}

//   ngOnInit(): void {
//     this.loadCourses();
//   }

//   loadCourses() {
//     this.coursesService.getCourses().subscribe(data => {
//       this.courses = data;
//       this.courses.forEach(course => this.loatLessons(course.id));
//     });
//   }

//   loatLessons(courseId: number) {
//     this.lessonsService.getLessonsByCourseId(courseId).subscribe(
//       lessons => {
//         const course = this.courses.find(c => c.id == courseId);
//         if (course) {
//           course.lessons = lessons;
//         }
//       }
//     );
//   }

//   enroll(courseId: number) {
//     const dialogRef = this.dialog.open(DialogComponent, {
//       data: {
//         title: 'Enroll in Course',
//         message: 'Are you sure you want to enroll in this course?'
//       }
//     });

//     dialogRef.afterClosed().subscribe(result => {
//       if (result) {
//         this.coursesService.addStudentToCourse(courseId, this.userId).subscribe({
//           next: (response) => {
//             console.log("success enroll", response);
//             this.loadCourses();
//           },
//           error: (error) => {
//             this.errorMessage = "not success to enroll";
//           }
//         });
//       }
//     });
//   }

//   unenroll(courseId: number) {
//     const dialogRef = this.dialog.open(DialogComponent, {
//       data: {
//         title: 'Unenroll from Course',
//         message: 'Are you sure you want to unenroll from this course?'
//       }
//     });

//     dialogRef.afterClosed().subscribe(result => {
//       if (result) {
//         this.coursesService.deleteStudentFromCourse(courseId, this.userId).subscribe({
//           next: (response) => {
//             console.log("success leave", response);
//             this.loadCourses();
//           },
//           error: (error) => {
//             this.errorMessage = "not success to leave";
//           }
//         });
//       }
//     });
//   }
// }

