import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromRoot from '../../app.reducer';
import { finishGame } from '../../store/actions/base.actions';

@Component({
  selector: 'app-finish-game',
  templateUrl: './finish-game.component.html',
  styleUrls: ['./finish-game.component.scss']
})
export class FinishGameComponent implements OnInit {
  @Input() outcome: string;

  constructor(private store: Store<fromRoot.State> ) { }

  ngOnInit() {
  }

  startNewGame() {
    // this.store.dispatch(finishGame({
    //
    // }));
  }

  resetScore() {

  }

}
