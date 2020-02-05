import { Component, DoCheck, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromRoot from '../../app.reducer';
import { nextTurn } from '../../store/actions/game.actions';
import { finishGame } from '../../store/actions/base.actions';
import { Board, GameState, PlayersData, StrokeShot } from '../../shared/interfaces';

@Component({
  selector: 'app-current-game',
  templateUrl: './current-game.component.html',
  styleUrls: ['./current-game.component.scss']
})
export class CurrentGameComponent implements OnInit, DoCheck {
  @Input() board: Board;
  @Input() gameState: GameState;
  @Output() shotStroke: EventEmitter<StrokeShot> = new EventEmitter();
  boardValues: string[];
  isStartScreen$: Observable<boolean>;
  turn$: Observable<boolean>;
  roles$: Observable<boolean>;
  isWinnerShown$: Observable<boolean>;
  playersData: PlayersData;
  isFirstPlayerTurn: boolean;
  isFirstPlayerPlayCrosses: boolean;
  firstPlayerShots: number[] = [];
  secondPlayerShots: number[] = [];
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

  constructor() { }



  ngDoCheck() {
    console.log(this.gameState)
    this.isFirstPlayerTurn = this.gameState.isFirstPlayerTurn;
    this.isFirstPlayerPlayCrosses = this.gameState.isFirstPlayerPlaysCrosses;
  }

  ngOnInit() {
    this.boardValues = Object.values(this.board);
    //this.playersData$ = this.store.select(fromRoot.getPlayersData);
    // this.isStartScreen$ = this.store.select(fromRoot.getScreenState);
    // this.playersData$ = this.store.select(fromRoot.getPlayersData);
    //this.playersData$.subscribe(res => this.playersData = res);
    // this.turn$ = this.store.select(fromRoot.getTurn);
    // this.turn$.subscribe(res => this.isFirstPlayerTurn = res);
    // this.roles$ = this.store.select(fromRoot.getCrossRole);
    // this.roles$.subscribe(res => this.isFirstPlayerPlayCrosses = res);
    // this.isWinnerShown$ = this.store.select(fromRoot.getWinnerState);
    // this.isWinnerShown$.subscribe(res => this.isWinnerShown = res);
  }

  emitShot(cellNumber, stateName) {
    this.shotStroke.emit({
      cell: cellNumber,
      state: stateName,
      isFirstPlayerTurn: !this.gameState.isFirstPlayerTurn
    });
  }

  shot(cell) {
    if (this.isFirstPlayerTurn) {
      this.emitShot(cell, 'crossed');
    } else {
      this.emitShot(cell, 'noughted');
    }
    //this.store.dispatch()
    // if at ninth turn no winner - it's a draw
    // this.shotsCount++;
    // if (this.firstPlayerShots.includes(item) || this.secondPlayerShots.includes(item)) return;
    // if (this.isFirstPlayerTurn) {
    //   this.cellsState[item] = 'crossed';
    //   this.firstPlayerShots.push(item);
    //   this.checkCombination(this.firstPlayerShots);
    // } else {
    //   this.cellsState[item] = 'noughted';
    //   this.secondPlayerShots.push(item);
    //   this.checkCombination(this.secondPlayerShots);
    // }
    // if (this.shotsCount === 9) {
    //   this.finishGame.emit('draw');
    //   this.store.dispatch(finishGame({
    //     firstPlayer: {
    //       name: this.playersData.firstPlayer.name,
    //       score-module: this.playersData.firstPlayer.score-module
    //     },
    //     secondPlayer: {
    //       name: this.playersData.secondPlayer.name,
    //       score-module: this.playersData.secondPlayer.score-module
    //     }
    //   }));
    //   return;
    // }
    //this.store.dispatch(nextTurn({isFirstPlayerTurn: !this.isFirstPlayerTurn}));
  }

  checkCombination(arr) {
    // for (const item in this.combinations) {
    //   if (this.combinations[item].every(comb => arr.includes(comb))) {
    //     if (this.isFirstPlayerTurn) {
    //       this.finishGame.emit(this.playersData.firstPlayer.name);
    //       this.store.dispatch(finishGame({
    //         firstPlayer: {
    //           name: this.playersData.firstPlayer.name,
    //           score: this.playersData.firstPlayer.score++
    //         },
    //         secondPlayer: {
    //           name: this.playersData.secondPlayer.name,
    //           score: this.playersData.secondPlayer.score
    //         }
    //       }));
    //     } else {
    //       this.finishGame.emit(this.playersData.secondPlayer.name);
    //       this.store.dispatch(finishGame({
    //         firstPlayer: {
    //           name: this.playersData.firstPlayer.name,
    //           score: this.playersData.firstPlayer.score
    //         },
    //         secondPlayer: {
    //           name: this.playersData.secondPlayer.name,
    //           score: this.playersData.secondPlayer.score++
    //         }
    //       }));
    //     }
    //   }
    // }
  }

}
