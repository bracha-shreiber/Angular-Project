import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { title } from 'process';
import { CourseService } from '../../service/course.service';
import { AuthService } from '../../service/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-course-add',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './course-add.component.html',
  styleUrl: './course-add.component.css'
})
export class CourseAddComponent implements OnInit{

form!:FormGroup;
addOrUpdate = false;

constructor(private fb:FormBuilder,
  private courseService:CourseService,
  private authService:AuthService,
  private router:Router,
  private route:ActivatedRoute
)
{this.form = this.fb.group({title:['',Validators.required],description:['',Validators.required]});}
  ngOnInit(): void {
    const course = sessionStorage.getItem('course');
    if(course){
      this.addOrUpdate=true;
      const parseCourse = JSON.parse(course);
      this.form.patchValue({title:parseCourse.title,description:parseCourse.description});
      sessionStorage.removeItem('course');
    }
    else{
      this.form.patchValue({title:'',description:''});
    }
  }

onSubmit() {
  const course={
    title:this.form.get('title')?.value,
    description:this.form.get('description')?.value,
    teacherId:this.authService.currentUser.id
  }
  let courseId = +this.route.snapshot.paramMap.get('courseId')!;
  if(this.addOrUpdate){
this.courseService.updateCourse(courseId,course).subscribe(
  ()=>{this.courseService.getCourses()}
);
this.courseService.getCourses()
  }
  else{
    this.courseService.addCourse(course).subscribe(()=>this.courseService.getCourses());
    
  }
  this.router.navigate(['/courses']);
}
}
