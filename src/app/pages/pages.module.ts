import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';

import {PagesComponent} from './pages.component';
import {AboutComponent} from './about/about.component';
import {ContactComponent} from './contact/contact.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {WorkModule} from './work/work.module';
import {PagesRoutingModule} from './pages-routing.module';

@NgModule({
  declarations: [
    PagesComponent,
    AboutComponent,
    ContactComponent,
    PageNotFoundComponent,
  ],
  imports: [
    FormsModule,
    PagesRoutingModule,
  ]
})
export class PagesModule {}
