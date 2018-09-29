import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-die',
  templateUrl: './die.component.html',
  styleUrls: ['./die.component.scss']
})
export class DieComponent implements OnInit {
  @Input() die: {
    rolled: number,
    isHit: boolean
  };
  currentDieClass = '';
  dieCssClass = {
    1: 'dice-1',
    2: 'dice-2',
    3: 'dice-3',
    4: 'dice-4',
    5: 'dice-5',
    6: 'dice-6'
  }

  constructor() {}

  ngOnInit() {
    this.getDieCssClass();
  }

  isDieSafe() {
    if(this.die.rolled > 0 && this.die.rolled <= 6) {
      return true;
    } else {
      return false;
    }
  }
  isMatch() {
    if (this.die.isHit) {
      return 'matched';
    } else {
      return '';
    }
  }
  getDieCssClass() {
    for (const key in this.dieCssClass) {
      if (Number.parseInt(key) === this.die.rolled) {
        this.currentDieClass = this.dieCssClass[key];
        return this.dieCssClass[key];
      }
    }
  }
}
