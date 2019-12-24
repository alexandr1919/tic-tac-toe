import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromRoot from '../../app.reducer';
import { nextTurn } from '../../shared/game.actions';
import { finishGame } from '../../shared/base.actions';
import { PlayersData } from '../../shared/interfaces';

@Component({
  selector: 'app-current-game',
  templateUrl: './current-game.component.html',
  styleUrls: ['./current-game.component.scss']
})
export class CurrentGameComponent implements OnInit {
  @Output() finishGame = new EventEmitter<string>();
  isStartScreen$: Observable<boolean>;
  turn$: Observable<boolean>;
  roles$: Observable<boolean>;
  playersData$: Observable<PlayersData>;
  isWinnerShown$: Observable<boolean>;
  playersData: PlayersData;
  cells: number[] = [];
  cellsState = {};
  isFirstPlayerTurn = true;
  isFirstPlayerPlayCrosses = true;
  firstPlayerShots: number[] = [];
  secondPlayerShots: number[] = [];
  shotsCount = 0;
  isWinnerShown = false;
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
    this.isStartScreen$ = this.store.select(fromRoot.getScreenState);
    this.playersData$ = this.store.select(fromRoot.getPlayersData);
    this.playersData$.subscribe((res) => this.playersData = res);
    this.turn$ = this.store.select(fromRoot.getTurn);
    this.turn$.subscribe(res => this.isFirstPlayerTurn = res);
    this.roles$ = this.store.select(fromRoot.getCrossRole);
    this.roles$.subscribe(res => this.isFirstPlayerPlayCrosses = res);
    this.isWinnerShown$ = this.store.select(fromRoot.getWinnerState);
    this.isWinnerShown$.subscribe(res => this.isWinnerShown = res);
  }

  generateCells() {
    for (let i = 0; i < 9; i++) {
      this.cells.push(i);
    }
  }

  shot(item) {
    // if at ninth turn no winner - it's a draw
    this.shotsCount++;
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
    console.log(this.cellsState)
    if (this.shotsCount === 9) {
      this.finishGame.emit('draw');
      this.store.dispatch(finishGame({
        firstPlayer: {
          name: this.playersData.firstPlayer.name,
          score: this.playersData.firstPlayer.score
        },
        secondPlayer: {
          name: this.playersData.secondPlayer.name,
          score: this.playersData.secondPlayer.score
        }
      }));
      return;
    }
    this.store.dispatch(nextTurn({isFirstPlayerTurn: !this.isFirstPlayerTurn}));
  }

  checkCombination(arr) {
    for (const item in this.combinations) {
      if (this.combinations[item].every(comb => arr.includes(comb))) {
        if (this.isFirstPlayerTurn) {
          this.finishGame.emit(this.playersData.firstPlayer.name);
          this.store.dispatch(finishGame({
            firstPlayer: {
              name: this.playersData.firstPlayer.name,
              score: this.playersData.firstPlayer.score++
            },
            secondPlayer: {
              name: this.playersData.secondPlayer.name,
              score: this.playersData.secondPlayer.score
            }
          }));
        } else {
          this.finishGame.emit(this.playersData.secondPlayer.name);
          this.store.dispatch(finishGame({
            firstPlayer: {
              name: this.playersData.firstPlayer.name,
              score: this.playersData.firstPlayer.score
            },
            secondPlayer: {
              name: this.playersData.secondPlayer.name,
              score: this.playersData.secondPlayer.score++
            }
          }));
        }
      }
    }
  }

}
