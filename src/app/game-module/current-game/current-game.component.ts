import { Component, DoCheck, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
  @Input() isWinnerShown: boolean;
  @Output() shotFired: EventEmitter<FiredShot> = new EventEmitter();
  boardValues: string[];
  playersData: PlayersData;
  isFirstPlayerPlayCrosses: boolean;

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
