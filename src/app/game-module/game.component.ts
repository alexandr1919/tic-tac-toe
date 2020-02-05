import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromRoot from '../app.reducer';
import { Observable } from 'rxjs';
import { Board, GameState, Player, PlayersData } from '../shared/interfaces';
import { nextTurn } from '../store/actions/game.actions';

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
  outcome: string;

  constructor(private store: Store<fromRoot.State>) {
  }

  ngOnInit() {
    this.gameState$ = this.store.select(fromRoot.getGameState);
    this.isWinnerShown$ = this.store.select(fromRoot.getWinnerState);
    this.boardState$ = this.store.select(fromRoot.getBoardState);
    // this.turn$ = this.store.select(fromRoot.getTurn);
    // this.turn$.subscribe(res => this.isFirstPlayerTurn = res);
  }

  shot(event) {
    this.store.dispatch(nextTurn({
      isFirstPlayerTurn: event.isFirstPlayerTurn
    }));

  }

  finishGame(outcome: string) {
    this.outcome = outcome;
  }
}
