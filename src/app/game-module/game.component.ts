import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromRoot from '../app.reducer';
import { Observable } from 'rxjs';
import { Board, Player, PlayersData } from '../shared/interfaces';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  isOngoingGame$: Observable<boolean>;
  isWinnerShown$: Observable<boolean>;
  playersData$: Observable<{firstPlayer: Player, secondPlayer: Player}>;
  boardState$: Observable<Board>;
  outcome: string;

  constructor(private store: Store<fromRoot.State>) {
  }

  ngOnInit() {
    this.isOngoingGame$ = this.store.select(fromRoot.getScreenState);
    this.isWinnerShown$ = this.store.select(fromRoot.getWinnerState);
    this.boardState$ = this.store.select(fromRoot.getBoardState);
    // this.turn$ = this.store.select(fromRoot.getTurn);
    // this.turn$.subscribe(res => this.isFirstPlayerTurn = res);
  }

  finishGame(outcome: string) {
    this.outcome = outcome;
  }
}
