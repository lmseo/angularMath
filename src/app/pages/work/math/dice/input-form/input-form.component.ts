import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-dice-reactive',
  templateUrl: './input-form.component.html',
  styleUrls: ['./input-form.component.scss']
})
export class InputFormComponent implements OnInit {
  rollsForm: FormGroup;
  hits = 0;
  forbiddenNumbers = [ 666, 999, 333];

  @Output() rollDie = new EventEmitter<[{numberRolled: number, hit: boolean}]>();

  constructor() {}
  ngOnInit(): void {
    this.rollsForm = new FormGroup({
     'rolls': new FormControl(10, [
        Validators.required,
        Validators.min(1),
        Validators.minLength(1),
        Validators.maxLength(7),
        Validators.max(9999999),
        Validators.pattern('[0-9]*'),
       this.isForbiddenRolls.bind(this)
      ]
     ),
     'dice': new FormControl(1, [
        Validators.required,
        Validators.min(1),
        Validators.minLength(1),
        Validators.maxLength(2),
        Validators.max(50),
        Validators.pattern('[0-9]*')
      ]),
     'yourNumber': new FormControl(1, [
        Validators.required,
        Validators.min(1),
        Validators.minLength(1),
        Validators.maxLength(1),
        Validators.max(6),
        Validators.pattern('[0-9]*')
      ])
    });
    this.setHits(
      +this.rollsForm.value.rolls,
      +this.rollsForm.value.dice,
      +this.rollsForm.value.yourNumber);
      // Observable to subscribe to rollsForm changes
      this.rollsForm.statusChanges.subscribe(
        status => {
          if (status) {
            if (this.rollsForm.valid) {
                this.setHits(
                  +this.rollsForm.value.rolls,
                  +this.rollsForm.value.dice,
                  +this.rollsForm.value.yourNumber);
            }
          }
      });
  }

  onSubmit() {
    this.rollsForm.markAsDirty();
    this.rolls.markAsDirty();
    this.dice.markAsDirty();
    this.yourNumber.markAsDirty();

    if (this.rolls.value) {
      this.setHits(
        +this.rollsForm.value.rolls,
        +this.rollsForm.value.dice,
        +this.rollsForm.value.yourNumber);
    }
  }
  get rolls() {
    return this.rollsForm.get('rolls');
  }
  get dice() {
    return this.rollsForm.get('dice');
  }
  get yourNumber() {
    return this.rollsForm.get('yourNumber');
  }
  setHits(numberRolls: number = 10, numberDice: number = 1, yourNumber: number = 1) {
    // counter for the number oif matches
    let hits = 0;
    let isHit = false;
    let die: {numberRolled: number, hit: boolean};
    let dice: [{numberRolled: number, hit: boolean}];


    // reset array this.dieRollNumbers to empty array
    // if(this.dieRollNumbers.length > 0){
    //   this.dieRollNumbers.splice(0,this.dieRollNumbers.length);
    // }
    if (Number.isSafeInteger(numberRolls)
          && Number.isSafeInteger(numberDice)
          && Number.isSafeInteger(yourNumber)) {
      for (let i = 1; i <= numberRolls; i++) {
        for (let j = 1; j <= numberDice; ++j) {
          const randomInt = this.getRandomIntInclusive(1 , 6);

          // Check if randomInt is safe to use
          if (!Number.isSafeInteger(randomInt)) {
            return false;
          }
          // Check if number picked by user is safe
          if (
          Number.isInteger(yourNumber) &&
          Number.isSafeInteger(yourNumber)) {
            if (yourNumber === randomInt) {
              // number of times dice match user number
              hits++;
              isHit = true;
            } else {
              isHit = false;
            }
          }
          die = {
            numberRolled : randomInt,
            hit : isHit
          };
          if (dice === undefined || <number>dice.length === 0 ) {
            dice = [die];
          } else {
            dice.push(die);
          }
        }
      }
    }
    this.rollDie.emit(dice);
    this.hits = hits;
  }
  getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    // The maximum # is exclusive and the minimum is inclusive
    return Math.floor(Math.random() * (max - min)) + min;
  }
  getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    // The maximum is inclusive and the minimum is inclusive
    return Math.floor(Math.random() * (max - min + 1)) + min;
   }
  isForbiddenRolls(control: FormControl): {[s: string]: any} {
   if (this.forbiddenNumbers.indexOf( +control.value) !== -1) {
     return {numberIsForbidden: { 'actualNumber' : +control.value }};
   }
   return null;
  }

  isForbiddenDice( control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>( (resolve, reject ) => {
      setTimeout( () => {
        if ( +control.value === 10) {
          resolve({numberIsForbidden: { 'actualNumber' : +control.value }});
        } else {
          resolve(null);
        }
      }, 1000 );
    });
    return promise;
  }
}
