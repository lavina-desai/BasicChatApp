import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';



@Injectable()
export class AuthService {
  user: Observable<firebase.User>;

  constructor(private _firebaseauth: AngularFireAuth,private router:Router) { 
    this.user = _firebaseauth.authState;
  }

  register(email:string,password:string){
    this._firebaseauth.auth.createUserWithEmailAndPassword(email,password)
      .then(value => {
        this.router.navigate(['login']);    
      })
      .catch(err => {
        console.log('Error',err.message);    
      });
  }

  login(email:string,password:string){
    this._firebaseauth.auth.signInWithEmailAndPassword(email,password)
      .then(value => {
        this.router.navigate(['chat']);    
      })
      .catch(err => {
        console.log('Error',err.message);    
      });
  }

  logout() {
    this._firebaseauth.auth.signOut();
    this.router.navigate(['login']);
  }

}
