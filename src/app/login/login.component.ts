import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: any = {
    email: "",
    password: ""
  }
  user: any;
  constructor(private service: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  login(){
    const {email,password} = this.form;

    var info = {
      "email": email,
      "password": password
    }

    this.service.Login(info).subscribe((response) => {
      console.log(response);
      this.user = response;
      localStorage.setItem("userId",this.user.id);
      localStorage.setItem("token",this.user.token)
      this.redirect();
    },error =>
    {
      console.log(error);
    })

  }
  redirect(){
    this.router.navigate(['/loginVerification']);
  }

}
