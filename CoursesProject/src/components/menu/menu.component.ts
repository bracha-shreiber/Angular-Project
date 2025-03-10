// import { Component, Output } from '@angular/core';
// import { Route, RouterLink, RouterLinkActive, RouterOutlet, Routes } from '@angular/router';
// import { LoginComponent } from '../login/login.component';

// @Component({
//   selector: 'app-menu',
//   standalone: true,
//   imports: [RouterLink,RouterLinkActive,RouterOutlet],
//   templateUrl: './menu.component.html',
//   styleUrl: './menu.component.css'
// })
// export class MenuComponent {
//   isLoggedIn = false;

//   onLogin() {
//     this.isLoggedIn = true;
//   }

//   signOut() {
//     // Logic to handle sign out
//     this.isLoggedIn = false;
//   }
// }

import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [RouterLink, RouterLinkActive,RouterOutlet,MatButtonModule,MatToolbarModule],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  isLoggedIn = false;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.loggedIn$.subscribe(loggedIn => {
      this.isLoggedIn = loggedIn;
    });
  }

  signOut() {
    this.authService.logout(); // Call logout method
  }
}
