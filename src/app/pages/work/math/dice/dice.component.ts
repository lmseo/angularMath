import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dice',
  templateUrl: './dice.component.html',
  styleUrls: ['./dice.component.scss']
})
export class DiceComponent implements OnInit{
  dice = [];

  constructor() {

  }
  ngOnInit() {
  }
  onDieRolled( dieData: [{ numberRolled: number, hit: boolean}]) {
     if ( this.dice.length === 0 ) {
       dieData.forEach(e => {
         this.dice.push({
            rolled: e.numberRolled,
            isHit : e.hit
          });
       });
     } else {
       // reset die array
       this.dice.length = 0;
       dieData.forEach(e => {
         this.dice.push({
            rolled: e.numberRolled,
            isHit : e.hit
          });
       });
     }
  }
}
