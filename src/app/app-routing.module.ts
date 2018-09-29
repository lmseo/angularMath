import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {HomeComponent} from './pages/home/home.component';
import {AboutComponent} from './pages/about/about.component';
import {ContactComponent} from './pages/contact/contact.component';
import {PageNotFoundComponent} from './pages/page-not-found/page-not-found.component';
import {LoginComponent} from './pages/login/login.component';
import {SignupComponent} from './pages/signup/signup.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent},
  { path: 'join', component: SignupComponent},
  { path: 'about', component: AboutComponent},
  { path: 'contact', component: ContactComponent},
  { path: 'not-found', component: PageNotFoundComponent },
  { path: '**', redirectTo: '/not-found' }
];
@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}