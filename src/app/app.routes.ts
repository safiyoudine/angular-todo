import { Routes } from '@angular/router';
import { LoginComponent } from './auth/components/login/login.component';
import { SignupComponent } from './auth/components/signup/signup.component';
import { PageNotFoundComponent } from '../shared/components/page-not-found/page-not-found.component';
import { authGuard } from './auth.guard';

export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' }, // Redirect to login by default
    { path: "login", component: LoginComponent,title:"Login" },
    { path: "signup", component: SignupComponent,title:"Signup" },
    { path: "admin", loadChildren: () => import("./modules/admin/admin.module").then(e => e.AdminModule) ,canActivate:[authGuard]},
    { path: '**', component: PageNotFoundComponent,title:"Page Not Found"}
];
