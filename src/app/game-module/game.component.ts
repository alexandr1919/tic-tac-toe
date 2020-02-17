import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromRoot from '../app.reducer';
import { Observable } from 'rxjs';
import { Board, GameState, Player } from '../shared/interfaces';
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

  gameState$: Observable<GameState>;
  isWinnerShown$: Observable<boolean>;
  playersData$: Observable<{firstPlayer: Player, secondPlayer: Player}>;
  boardState$: Observable<Board>;
  turn$: Observable<boolean>;
  boardState: Board;
  //outcome: string;

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
      return;
    }

    combinations.forEach((combination, index) => {
      const newArr = [];
      combination.forEach((cellIndex) => {
        newArr.push(boardStateArr[index]);
      });
      console.log(newArr)
    })
  }


  finishGame(outcome: string) {
    //this.outcome = outcome;
  }
}
