import { Component, DoCheck, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromRoot from '../../app.reducer';
import { nextTurn } from '../../store/actions/game.actions';
import { finishGame } from '../../store/actions/base.actions';
import { Board, GameState, PlayersData, FiredShot } from '../../shared/interfaces';

@Component({
  selector: 'app-current-game',
  templateUrl: './current-game.component.html',
  styleUrls: ['./current-game.component.scss']
})
export class CurrentGameComponent implements OnInit, DoCheck {
  @Input() board: Board;
  @Input() gameState: GameState;
  @Input() isFirstPlayerTurn: boolean;
  @Output() shotFired: EventEmitter<FiredShot> = new EventEmitter();
  boardValues: string[];
  isStartScreen$: Observable<boolean>;
  turn$: Observable<boolean>;
  roles$: Observable<boolean>;
  isWinnerShown$: Observable<boolean>;
  playersData: PlayersData;
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

  ngOnInit() {
    this.isFirstPlayerTurn = this.gameState.isFirstPlayerTurn;
    this.isFirstPlayerPlayCrosses = this.gameState.isFirstPlayerPlaysCrosses;
  }

  ngDoCheck() {
    this.boardValues = Object.values(this.board);
  }

  emitShot(cellNumber, stateName) {
    this.shotFired.emit({
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
