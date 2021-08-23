import { Component, OnInit } from '@angular/core';
import {  AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login-verification',
  templateUrl: './login-verification.component.html',
  styleUrls: ['./login-verification.component.css']
})
export class LoginVerificationComponent implements OnInit {

  form: any = {
    code: ""
  }
  user: any;

  constructor(private router: Router,private service: AuthService) { }

  ngOnInit(): void {
    var userId = parseInt(localStorage.getItem("userId"));

    this.service.getUser(userId).subscribe(result => {
      this.user = result;
      if(this.user.registerConfirmation == false){
        this.redirect()
      }
    })

  }
  verifyCode(){
    const {code} = this.form;
    var userId = parseInt(localStorage.getItem("userId"));
    var codeInfo = {
      "userId": userId,
      "code": code
    }
    this.service.loginVerification(codeInfo).subscribe(result =>{
      this.user = result;
      console.log(this.user);
      this.router.navigate(['/home'])
    })
  }
  redirect(){
    this.router.navigate(['']);
  }

}
