import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {WorkComponent} from './work.component';
import {MathComponent} from './math/math.component';
import {DiceComponent} from './math/dice/dice.component';
import {DateTimeComponent} from './date-time/date-time.component';
import {SourceComponent} from './source/source.component';

const diceRoutes: Routes = [
  { path: '', children: [
      { path: '', component: WorkComponent, pathMatch: 'full'},
      { path: 'math', children: [
          {path: '', component: MathComponent },
          { path: 'dice', component: DiceComponent}
        ]},
      { path: 'date-time', component: DateTimeComponent},
      { path: 'source',
        // canActivate: [ AuthGuardService],
        component: SourceComponent},
    ]},
];
@NgModule({
  imports: [
    RouterModule.forChild(diceRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class WorkRoutingModule {

}
