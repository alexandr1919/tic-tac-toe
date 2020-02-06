import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromRoot from '../app.reducer';
import { Observable } from 'rxjs';
import { Board, GameState, Player, PlayersData } from '../shared/interfaces';
import { nextTurn } from '../store/actions/game.actions';
import { startGame } from '../store/actions/players-data.actions';
import { newGame } from '../store/actions/base.actions';
import { shoot } from '../store/actions/board.actions';

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
    });
    // this.turn$.subscribe(res => this.isFirstPlayerTurn = res);
  }

  gameStarted(event) {
    this.store.dispatch(startGame({
      firstPlayerName: event[0],
      secondPlayerName: event[1]
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
    if (Object.values(this.boardState).includes(null))
  }

  finishGame(outcome: string) {
    //this.outcome = outcome;
  }
}
