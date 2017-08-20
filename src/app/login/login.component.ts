import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormGroup, FormControl, Validators, FormBuilder }  from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email:string;
  password:string;

   loginForm = this._fb.group({
    email: ["", [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
    password: ["", [Validators.required]]

  });

  constructor(private _authService: AuthService,private _fb: FormBuilder) { }

  ngOnInit() {
  }

  login() {
    this._authService.login(this.email, this.password);
    this.email = this.password = '';   
  }

}
