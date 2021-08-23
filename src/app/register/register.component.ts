import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form: any = {
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    phoneNumber:"",
    role: 2
  }

  user:any;
  constructor(private service: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  register(){
    const {email,password,firstName,lastName, role, phoneNumber} = this.form;

    var info = {
      "email":email,
      "password": password,
      "firstName": firstName,
      "LastName": lastName,
      "phone": phoneNumber,
      "roleId": role
    }



    this.service.Register(info).subscribe((response)=>{
      console.log(response);
      this.user = response;
      localStorage.setItem("userId", this.user.id);
      this.redirect();
      
    })
  }
  redirect(){
    this.router.navigate(['']);
  }

}
