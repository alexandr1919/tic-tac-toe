import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromRoot from '../../app.reducer';
import { nextTurn } from '../../shared/game.actions';

@Component({
  selector: 'app-current-game',
  templateUrl: './current-game.component.html',
  styleUrls: ['./current-game.component.scss']
})
export class CurrentGameComponent implements OnInit {
  isOngoingGame$: Observable<boolean>;
  turn$: Observable<boolean>;
  roles$: Observable<boolean>;
  isFirstPlayerTurn = true;
  isFirstPlayerPlayCrosses = true;
  cells: number[] = [];
  checkedCrosses: number[] = [];
  checkedNoughts: number[] = [];

  constructor(private store: Store<fromRoot.State> ) { }

  ngOnInit() {
    this.isOngoingGame$ = this.store.select(fromRoot.getBaseGameState);
    this.turn$ = this.store.select(fromRoot.getTurn);
    this.roles$ = this.store.select(fromRoot.getCrossRole);
    this.generateCells();
  }

  generateCells() {
    for (let i = 0; i < 9; i++) {
      this.cells.push(i);
    }
  }

  shot(item) {
    this.store.dispatch(nextTurn({isFirstPlayerTurn: !this.isFirstPlayerTurn}));
    this.turn$.subscribe(res => this.isFirstPlayerTurn = res);
    this.roles$.subscribe(res => this.isFirstPlayerPlayCrosses = res);
    console.log(this.isFirstPlayerPlayCrosses);
    console.log(this.isFirstPlayerTurn);
  }

}
