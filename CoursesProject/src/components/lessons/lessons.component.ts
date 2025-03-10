import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LessonService } from '../../service/lesson.service';
import { Lesson } from '../../models/lessonType';
import { Observable } from 'rxjs/internal/Observable';
import { AuthService } from '../../service/auth.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-lessons',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './lessons.component.html',
  styleUrl: './lessons.component.css'
})
export class LessonsComponent implements OnInit {
  courseId: number = 0;
  lessons: Observable<Lesson[]> | undefined;
  userRole: string = ""
  constructor(private lessonsService: LessonService, private router: Router, private route: ActivatedRoute, private authService: AuthService) { }
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      if (params.has('courseId')) {
        this.courseId = parseInt(params.get('courseId') || '');
        this.userRole = this.authService.currentUser.role
      }
      console.log(this.courseId);
    });
    if (this.courseId) {
      this.lessonsService.getLessonsByCourseId(this.courseId)
      this.lessons = this.lessonsService.$lessons
    }
  }
  addLesson() {
    this.router.navigate(['lessons/newLesson']);
  }
  editLesson(lessonId: number) {
    const lesson = this.lessonsService.getLessonById(this.courseId, lessonId).subscribe(
      (lesson: Lesson) => {
        const l = { ...lesson }
        sessionStorage.setItem('lesson', JSON.stringify(l));
        this.router.navigate([`courses/lessons/${lessonId}/edit`])
      }, (error) => {
        console.error("not success to edit lesson", error);
      }
    )
  }
  deleteLesson(lessonId: number) {
    if(this.courseId!=undefined){
    this.lessonsService.deleteLessonById(this.courseId, lessonId);}
    else console.error("courseId is undefined");
  }
}
