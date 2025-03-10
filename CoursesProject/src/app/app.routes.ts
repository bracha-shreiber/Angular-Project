import { Routes } from '@angular/router';
import { MenuComponent } from '../components/menu/menu.component';
import { LoginComponent } from '../components/login/login.component';
import { CoursesComponent } from '../components/courses/courses.component';
import { CourseAddComponent } from '../components/course-add/course-add.component';
import { LessonsComponent } from '../components/lessons/lessons.component';
import { LessonAddComponent } from '../components/lesson-add/lesson-add.component';
import { authGuardGuard } from '../guard/auth-guard.guard';

export const routes: Routes = [
    { path: "", component: MenuComponent },
    { path: "login", component: LoginComponent },
    { path: "courses", component: CoursesComponent },
    { path: "courses/newCourse", component: CourseAddComponent },
    { path: "courses/:courseId/edit", component: CourseAddComponent },
    { path: "courses/:courseId/lessons", component: LessonsComponent, canActivate: [authGuardGuard] },
    {path:"courses/:courseId/lessons/newLesson",component:LessonAddComponent},
    {path:"courses/:courseId/lessons/:lessonId/edit",component:LessonAddComponent}

];
