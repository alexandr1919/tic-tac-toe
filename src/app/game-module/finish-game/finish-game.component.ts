import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromRoot from '../../app.reducer';
import { startGame } from '../../shared/base.actions';

@Component({
  selector: 'app-finish-game',
  templateUrl: './finish-game.component.html',
  styleUrls: ['./finish-game.component.scss']
})
export class FinishGameComponent implements OnInit {
  @Input() result: string;

  constructor(private store: Store<fromRoot.State> ) { }

  ngOnInit() {
  }

  startNewGame() {
    // this.store.dispatch(startGame({
    //
    // }))
  }

  resetScore() {

  }

}
