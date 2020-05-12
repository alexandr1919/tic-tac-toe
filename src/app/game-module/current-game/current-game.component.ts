import { Component, DoCheck, EventEmitter, Input, Output } from '@angular/core';

import { board as initialBoardState, COMBINATIONS, RESULT, TURN_STATE } from '../../shared/util';

@Component({
  selector: 'app-current-game',
  templateUrl: './current-game.component.html',
  styleUrls: ['./current-game.component.scss']
})
export class CurrentGameComponent implements DoCheck {
  @Input() turn: string;
  @Input() isFirstPlayerPlaysCrosses: boolean;
  @Output() emittedAttempt: EventEmitter<string> = new EventEmitter();
  @Output() gameFinished: EventEmitter<string> = new EventEmitter();
  isGameFinished: boolean;
  board = { ...initialBoardState };
  boardAsArray: string[];

  ngDoCheck() {
    this.boardAsArray = Object.values(this.board);
  }

  attempt(cell) {
    if (this.board[cell] !== null) return;
    this.emittedAttempt.next(this.turn === TURN_STATE.CROSS ? TURN_STATE.NOUGHT : TURN_STATE.CROSS);
    this.turn === TURN_STATE.CROSS ? this.board[cell] = 'crossed' : this.board[cell] = 'noughted';
    this.checkCombination();
  }

  checkCombination() {
    const boardStateArr = Object.values(this.board);
    COMBINATIONS.forEach(combination => {
      const arrayToCheck = [];
      combination.forEach(cell => {
        arrayToCheck.push(this.board[cell]);
        if (arrayToCheck.length > 2 && arrayToCheck.every((cellValue, i, arr) => cellValue === arr[0] && cellValue !== null)) {
          this.turn === TURN_STATE.CROSS ? this.gameFinished.emit(RESULT.CROSS) : this.gameFinished.emit(RESULT.NOUGHT);
          this.isGameFinished = true;
        }
      });
    });
    if (!boardStateArr.includes(null) && !this.isGameFinished) {
      this.isGameFinished = true;
      this.gameFinished.emit(RESULT.DRAW);
    }
  }
}
