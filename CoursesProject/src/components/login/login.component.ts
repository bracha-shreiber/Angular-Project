// import { Component, EventEmitter, OnInit, Output } from '@angular/core';
// import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
// import { User } from '../../models/userType';
// import { HttpClientModule } from '@angular/common/http';
// import { AuthService } from '../../service/auth.service';
// import { response } from 'express';
// import { error } from 'console';
// @Component({
//   selector: 'app-login',
//   standalone: true,
//   imports: [ReactiveFormsModule, HttpClientModule],
//   templateUrl: './login.component.html',
//   styleUrl: './login.component.css'
// })
// export class LoginComponent implements OnInit {
//   form!: FormGroup;
//   isRegister = false;
//   @Output() loggedIn = new EventEmitter<boolean>();
//   constructor(private fb: FormBuilder, private authService: AuthService) { }

//   ngOnInit() {
//     this.form = this.fb.group({
//       email: ['', [Validators.required, Validators.email]],
//       password: ['', Validators.required],
//       role: ['student',Validators.required]
//     });
//   }

//   toggelRegister() {
//     this.isRegister = !this.isRegister;
//     if (this.isRegister) {
//       this.form.addControl('name', this.fb.control('', Validators.required));
//     }
//     else { this.form.removeControl('name'); }
//   }


//   onSubmit() {

//     if (this.form.valid) {
//       const user = this.createUser();
//       if (this.isRegister) {
//         this.authService.register(user).subscribe(response=>{
//           console.log('user registed: ',response,response.id),
//           this.loggedIn.emit(true);
//         },
//           error=>console.error('register error: ',error))
//       }
//       else{
//         this.authService.login({email:user.email,password:user.password}).subscribe(response=>{
//           console.log('user logged in: ',response)
//         },error=>console.error('login error: ',error))
        
//       }
//     }
//   }

//   private createUser(): Partial<User> {
//     return this.isRegister ? {
//       name: this.form.value.name,
//       email: this.form.value.email,
//       password: this.form.value.password,
//       role: this.form.value.role
//     } : {
//       email: this.form.value.email,
//       password: this.form.value.password
//     };
//   }


// }

import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { User } from '../../models/userType';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';
import {MatCardModule} from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatToolbar } from '@angular/material/toolbar';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule,MatCardModule, MatFormFieldModule, MatInputModule, MatSelectModule,MatButtonModule,MatToolbar],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  isRegister = false;

  constructor(private fb: FormBuilder, private authService: AuthService,private router:Router) { }

  ngOnInit() {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      role: ['select a role', Validators.required]
    });
  }

  toggleRegister() {
    this.isRegister = !this.isRegister;
    if (this.isRegister) {
      this.form.addControl('name', this.fb.control('', Validators.required));
      this.form.addControl('role',this.fb.control('',Validators.required));
    } else {
      this.form.removeControl('name');
      this.form.removeControl('role');
    }
  }

  onSubmit() {
    if (this.form.valid) {
      const user = this.createUser();
      if (this.isRegister) {
        this.authService.register(user).subscribe((response:any) => {
          if (typeof window !== 'undefined') {
            sessionStorage.setItem('token', response.token);
          }
          console.log('user registered: ', response),
          this.router.navigate(['/']); 
        }, error => console.error('register error: ', error));
      } else {
        this.authService.login({ email: user.email, password: user.password }).subscribe((response:any) => {
          if (typeof window !== 'undefined') {
            sessionStorage.setItem('token', response.token);
          }
          console.log('user logged in: ', response),
          this.router.navigate(['/']);
        }, error => console.error('login error: ', error));
      }
    }
  }

  private createUser(): Partial<User> {
    return this.isRegister ? {
      name: this.form.value.name,
      email: this.form.value.email,
      password: this.form.value.password,
      role: this.form.value.role
    } : {
      email: this.form.value.email,
      password: this.form.value.password
    };
  }
}


