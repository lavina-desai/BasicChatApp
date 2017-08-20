import { async, ComponentFixture, TestBed ,fakeAsync} from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { MaterialModule, MdCard, MdCardHeader } from '@angular/material';
import { FormBuilder, FormGroup, Validators ,FormsModule,ReactiveFormsModule} from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthService } from '../auth.service';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { environment } from '../../environments/environment';
import { appRoutes } from '../app-router/router';



fdescribe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  const testUser = {
    account:'abcd',
    email: 'test@gmail.com',
    password: 'test@123',
    invalid_email: "abc",
  };


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [
        MaterialModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forRoot(appRoutes),
        AngularFireAuthModule,
        AngularFireDatabaseModule,
        AngularFireModule.initializeApp(environment.firebase_config),
      ],
      providers:[AuthService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
  it('form invalid when empty', fakeAsync(() => {
    let form = getComponentForm();
    expect(form.valid).toBeFalsy();
  }));

  it('form validity', fakeAsync(() => {
    let form = getComponentForm();
    expect(form.valid).toBeFalsy();
    form.controls['account'].setValue(testUser.account);
    form.controls['email'].setValue(testUser.email);
    form.controls['password'].setValue(testUser.password);
    expect(form.valid).toBeTruthy();
  }));

  it('email field validity', fakeAsync(() => {
    let form = getComponentForm();
    let errors = {};
    let email = form.controls['email'];
    expect(email.valid).toBeFalsy();

    // Email field is required
    errors = email.errors || {};
    expect(errors['required']).toBeTruthy();

    // Set email to something
    email.setValue(testUser.invalid_email);
    errors = email.errors || {};
    expect(errors['required']).toBeFalsy();
    expect(errors['pattern']).toBeTruthy();

    // Set email to something correct
    email.setValue(testUser.email);
    errors = email.errors || {};
    expect(errors['required']).toBeFalsy();
    expect(errors['pattern']).toBeFalsy();
  }));

it('password field validity', fakeAsync(() => {
    let form = getComponentForm();
    let errors = {};
    let password = form.controls['password'];
    expect(password.valid).toBeFalsy();

    // password field is required
    errors = password.errors || {};
    expect(errors['required']).toBeTruthy();

    // Set password to something correct
    password.setValue(testUser.password);
    errors = password.errors || {};
    expect(errors['required']).toBeFalsy();
  }));

function initComponent() {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
  }

  function getComponentForm() {
    initComponent();
    return component.loginForm;
  }

});
