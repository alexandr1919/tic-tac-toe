import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromRoot from '../app.reducer';
import { Observable } from 'rxjs';
import { Board, GameState, PlayersData } from '../shared/interfaces';
import { nextTurn } from '../store/actions/game.actions';
import { startGame } from '../store/actions/players-data.actions';
import { finishGame, newGame } from '../store/actions/base.actions';
import { shoot } from '../store/actions/board.actions';
import { combinations } from '../shared/util';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  @Input() isOngoingGame: boolean;
  @Input() playersData: PlayersData;
  gameState$: Observable<GameState>;
  isWinnerShown$: Observable<boolean>;
  boardState$: Observable<Board>;
  turn$: Observable<boolean>;
  boardState: Board;
  isFirstPlayerTurn: boolean;
  outcome: string;

  constructor(private store: Store<fromRoot.State>) {}

  ngOnInit() {
    this.gameState$ = this.store.select(fromRoot.getGameState);
    this.isWinnerShown$ = this.store.select(fromRoot.getWinnerState);
    this.boardState$ = this.store.select(fromRoot.getBoardState);
    this.turn$ = this.store.select(fromRoot.getTurn);
    this.boardState$.subscribe(res => {
      this.boardState = res;
      this.boardState.type && delete this.boardState.type; // TODO figure out why every action leads to "type" property in state object
    });
    this.turn$.subscribe(res => {
      this.isFirstPlayerTurn = res;
    })
  }

  gameStarted(playerNames) {
    this.store.dispatch(startGame({
      firstPlayerName: playerNames[0],
      secondPlayerName: playerNames[1]
    }));
    this.store.dispatch(newGame({}));
  }

  shot(event) {
    const shootCell = event.cell;
    if (this.boardState[shootCell] !== null) return;
    this.boardState[shootCell] = event.state;
    this.store.dispatch(nextTurn({
      isFirstPlayerTurn: event.isFirstPlayerTurn
    }));
    this.store.dispatch(shoot(this.boardState));
    this.checkCombination();
  }

  checkCombination() {
    const boardStateArr = Object.values(this.boardState);
    if (!boardStateArr.includes(null)) {
      this.store.dispatch(finishGame({}));
      this.outcome = 'draw';
      return;
    }

    combinations.forEach((combination, index) => {
      const arrayToCheck = [];
      combination.forEach((cell) => {
        arrayToCheck.push(this.boardState[cell]);
        if (arrayToCheck.length > 2 && arrayToCheck.every((val, i, arr) => val === arr[0] && val !== null)) {
          this.store.dispatch(finishGame({}));
          this.isFirstPlayerTurn ? this.outcome = this.playersData.secondPlayer.name : this.outcome = this.playersData.firstPlayer.name;
        }
      });
    });
  }

}
