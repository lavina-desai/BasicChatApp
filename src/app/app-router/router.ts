import { Routes } from '@angular/router';
import { ChatComponent } from '../chat/chat.component';
import { RegistrationComponent } from '../registration/registration.component';
import { LoginComponent } from '../login/login.component';

export const appRoutes:Routes = [
    { path:'chat', component: ChatComponent},
    { path:'register', component: RegistrationComponent},
    { path:'login', component: LoginComponent},
    { path:'',redirectTo:'/login', pathMatch:'full'}
]