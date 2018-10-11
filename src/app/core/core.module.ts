import {NgModule} from '@angular/core';
import {HeaderComponent} from './header/header.component';
import {FooterComponent} from './footer/footer.component';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {AppRoutingModule} from '../app-routing.module';
import {HomeComponent} from './home/home.component';

@NgModule({
  declarations: [
    HomeComponent,
    HeaderComponent,
    FooterComponent,
  ],
  imports: [
    FormsModule,
    CommonModule,
    AppRoutingModule,
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    AppRoutingModule
  ]
})
export class CoreModule {}
