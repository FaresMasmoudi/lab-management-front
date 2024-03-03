import { Component } from '@angular/core';
import {AuthService} from "../../services/AuthService";
import {Router} from "@angular/router";

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent {
  user!:any;
  //récuperation de username et circle account

  constructor(private authService: AuthService, private router: Router) {
    this.authService.getUserClaims().then((u)=>{
      this.user=u;
      if(!!this.user)console.log(this.user.displayName)
    })
  }
  signOut() {
    this.authService.doLogout().then(() => {
      this.router.navigate(['/login'])
    })
  }
}
