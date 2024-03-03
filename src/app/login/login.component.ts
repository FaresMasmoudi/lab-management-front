import { Component } from '@angular/core';
import {AuthService} from "../../services/AuthService";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  // injection de dépendance
  constructor(private authService: AuthService, private router: Router) {
  }

  //.then() partie subscriber

  // thread de type promise
  signIn() {
    this.authService.doGoogleLogin().then(() => {
      this.router.navigate(['/members'])
    })
  }
}
