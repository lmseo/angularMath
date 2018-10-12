import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {MathComponent} from './math/math.component';
import {WorkComponent} from './work.component';
import {DateTimeComponent} from './date-time/date-time.component';
import {AlgorithmsComponent} from './algorithms/algorithms.component';
import {CryptographyComponent} from './cryptography/cryptography.component';
import {EncodingComponent} from './encoding/encoding.component';
import {DiceModule} from './math/dice/dice.module';
import {WorkRoutingModule} from './work-routing.module';
import {SourceComponent} from './source/source.component';

@NgModule({
  declarations: [
    WorkComponent,
    MathComponent,
    DateTimeComponent,
    AlgorithmsComponent,
    CryptographyComponent,
    EncodingComponent,
    SourceComponent,
  ],
  imports: [
    CommonModule,
    DiceModule,
    WorkRoutingModule
  ]
})
export class WorkModule {}
