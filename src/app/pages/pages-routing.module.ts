import { NgModule} from '@angular/core';
import { RouterModule, Routes} from '@angular/router';
import { AboutComponent} from './about/about.component';
import { ContactComponent} from './contact/contact.component';
import { PageNotFoundComponent} from './page-not-found/page-not-found.component';

const pagesRouting: Routes = [
  { path: 'about', component: AboutComponent},
  { path: 'contact', component: ContactComponent},
  { path: 'not-found', component: PageNotFoundComponent },
];

@NgModule({
  imports: [
    RouterModule.forChild(pagesRouting)
  ],
  exports: [
    RouterModule
  ]
})
export class PagesRoutingModule {}
