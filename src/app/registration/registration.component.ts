import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormGroup, FormControl, Validators, FormBuilder }  from '@angular/forms';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent  {

  email:string;
  password:string;

  registerForm = this._fb.group({
    email: ["", [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
    password: ["", [Validators.required]]

  });

  constructor(private _authService: AuthService,private _fb: FormBuilder) { }

  register(){
    this._authService.register(this.email,this.password);
    this.email = this.password = '';
  }
  

}
