import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LessonService } from '../../service/lesson.service';
import { AuthService } from '../../service/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-lesson-add',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './lesson-add.component.html',
  styleUrl: './lesson-add.component.css'
})
export class LessonAddComponent implements OnInit{
form!:FormGroup;
addOrUpdate = false;
courseId:number=0;

constructor(private fb:FormBuilder,
  private lessonsService:LessonService,
  private authService:AuthService,
  private router:Router,
  private route:ActivatedRoute
)
{this.form = this.fb.group({title:['',Validators.required],content:['',Validators.required]});}
  ngOnInit(): void {
    const lesson = sessionStorage.getItem('lesson');
    if(lesson){
      this.addOrUpdate=true;
      const parseLesson = JSON.parse(lesson);
      this.form.patchValue({title:parseLesson.title,content:parseLesson.content});
      sessionStorage.removeItem('lesson');
      this.route.paramMap.subscribe(params => {
        if (params.has('courseId')) {
          this.courseId = parseInt(params.get('courseId') || '');}})
    }
    else{
      this.form.patchValue({title:'',content:''});
      this.route.paramMap.subscribe(params => {
        if (params.has('courseId')) {
          this.courseId = parseInt(params.get('courseId') || '');}})
    }
  }

onSubmit() {
  const lesson={
    title:this.form.get('title')?.value,
    content:this.form.get('content')?.value,
    courseId:this.courseId
  }
  
  let lessonId = +this.route.snapshot.paramMap.get('lessonId')!;
  if(this.addOrUpdate){
this.lessonsService.updateLessonById(this.courseId,lessonId,lesson).subscribe(
  ()=>this.lessonsService.getLessonsByCourseId(this.courseId)
);
  }
  else{
    this.lessonsService.addLessonInCourse(lesson.title,lesson.content,lesson.courseId).subscribe(
      ()=>this.lessonsService.getLessonsByCourseId(this.courseId));
  }
  this.router.navigate([`/courses/${this.courseId}/lessons`]);
}

}
