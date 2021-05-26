import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {LoginComponent} from './login/login.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {ProfileComponent} from './profile/users.component';
import {HomeComponent} from './home/home.component';
import { AuthGuard } from './helpers/auth.guard';
import {RegisterComponent} from './register/register.component';


const routes: Routes = [
  {
    path: '', component: LoginComponent,
  },
  {
    path: 'login', component: LoginComponent,
  },
  {path: 'logout', component: LoginComponent},
  {
    path: 'register', component: RegisterComponent
  },
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'profile', component: ProfileComponent,
    canActivate: [AuthGuard]},
  {path: 'servers', component: HomeComponent,  canActivate: [AuthGuard]},
  {path: '404', component: PageNotFoundComponent},
  {
    path: '**', redirectTo: '/404', pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
