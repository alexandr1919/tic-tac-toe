import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromRoot from '../../app.reducer';
import { nextTurn } from '../../shared/game.actions';
import { PlayersData } from '../../shared/interfaces';

@Component({
  selector: 'app-current-game',
  templateUrl: './current-game.component.html',
  styleUrls: ['./current-game.component.scss']
})
export class CurrentGameComponent implements OnInit {
  @Output() finishGame = new EventEmitter<string>();
  isOngoingGame$: Observable<boolean>;
  turn$: Observable<boolean>;
  roles$: Observable<boolean>;
  playersData$: Observable<PlayersData>;
  playersData: PlayersData;
  cells: number[] = [];
  cellsState = {};
  isFirstPlayerTurn = true;
  isFirstPlayerPlayCrosses = true;
  firstPlayerShots: number[] = [];
  secondPlayerShots: number[] = [];
  isGameFinished = false;
  combinations: number[][] = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7]
  ];

  constructor(private store: Store<fromRoot.State> ) { }

  ngOnInit() {
    this.generateCells();
    this.isOngoingGame$ = this.store.select(fromRoot.getBaseGameState);
    this.playersData$ = this.store.select(fromRoot.getPlayersData);
    this.playersData$.subscribe((res) => this.playersData = res);
    this.turn$ = this.store.select(fromRoot.getTurn);
    this.turn$.subscribe(res => this.isFirstPlayerTurn = res);
    this.roles$ = this.store.select(fromRoot.getCrossRole);
    this.roles$.subscribe(res => this.isFirstPlayerPlayCrosses = res);
  }

  generateCells() {
    for (let i = 0; i < 9; i++) {
      this.cells.push(i);
    }
  }

  shot(item) {
    if (this.firstPlayerShots.includes(item) || this.secondPlayerShots.includes(item)) return;
    if (this.isFirstPlayerTurn) {
      this.cellsState[item] = 'crossed';
      this.firstPlayerShots.push(item);
      this.checkCombination(this.firstPlayerShots);
    } else {
      this.cellsState[item] = 'noughted';
      this.secondPlayerShots.push(item);
      this.checkCombination(this.secondPlayerShots);
    }
    this.store.dispatch(nextTurn({isFirstPlayerTurn: !this.isFirstPlayerTurn}));
  }

  checkCombination(arr) {
    for (const item in this.combinations) {
      if (this.combinations[item].every(comb => arr.includes(comb))) {
        this.isGameFinished = true;
        this.isFirstPlayerTurn ?
          this.finishGame.emit(this.playersData.firstPlayer.name) :
          this.finishGame.emit(this.playersData.secondPlayer.name);
      }
    }
  }

}
