import {NgModule} from '@angular/core';
import {DiceComponent} from './dice.component';
import {DieComponent} from './die/die.component';
import {InputFormComponent} from './input-form/input-form.component';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    DiceComponent,
    DieComponent,
    InputFormComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  providers: [],
})
export class DiceModule {

}
