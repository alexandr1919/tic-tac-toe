import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromRoot from '../../app.reducer';

@Component({
  selector: 'app-finish-game',
  templateUrl: './finish-game.component.html',
  styleUrls: ['./finish-game.component.scss']
})
export class FinishGameComponent implements OnInit, OnChanges {
  @Input() outcome: string;

  constructor(private store: Store<fromRoot.State> ) { }

  ngOnInit() {
  }

  ngOnChanges() {
    console.log(this.outcome)
  }

  startNewGame() {
  }

  resetScore() {

  }

}
