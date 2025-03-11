import { Routes } from '@angular/router';
import { MenuComponent } from '../components/menu/menu.component';
import { LoginComponent } from '../components/login/login.component';
import { CoursesComponent } from '../components/courses/courses.component';
import { CourseAddComponent } from '../components/course-add/course-add.component';
import { LessonsComponent } from '../components/lessons/lessons.component';
import { LessonAddComponent } from '../components/lesson-add/lesson-add.component';
import { authGuardGuard } from '../guard/auth-guard.guard';
import { UserCoursesComponent } from '../components/user-courses/user-courses.component';

export const routes: Routes = [
    { path: "", component: MenuComponent },
    { path: "login", component: LoginComponent },
    { path: "courses", component: CoursesComponent, canActivate:[authGuardGuard] },
    {path:"courses/myCourses",component:UserCoursesComponent, canActivate:[authGuardGuard]},
    { path: "courses/newCourse", component: CourseAddComponent, canActivate:[authGuardGuard] },
    { path: "courses/:courseId/edit", component: CourseAddComponent , canActivate:[authGuardGuard]},
    { path: "courses/:courseId/lessons", component: LessonsComponent, canActivate: [authGuardGuard] },
    {path:"courses/:courseId/lessons/newLesson",component:LessonAddComponent, canActivate:[authGuardGuard]},
    {path:"courses/:courseId/lessons/:lessonId/edit",component:LessonAddComponent, canActivate:[authGuardGuard]}

];
