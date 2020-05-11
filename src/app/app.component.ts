import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromRoot from './app.reducer';
import * as fromPlayersData from './store/reducers/players-data.reducer';
import { SCREEN_STATES } from './shared/util';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  isStartScreen: boolean;
  gameState = {
    turn: '',
    isFirstPlayerPlaysCrosses: true,
    isGameFinished: false
  };
  playersData$: Observable<fromPlayersData.State>;

  constructor(private store: Store<fromRoot.State>) {}

  ngOnInit() {
    this.store.select(fromRoot.getScreenState).subscribe(screenState => {
      this.isStartScreen = screenState === SCREEN_STATES.START_SCREEN;
      this.gameState.isGameFinished = screenState === SCREEN_STATES.GAME_FINISHED;
    });
    this.store.select(fromRoot.getTurnState).subscribe(turnState => this.gameState.turn = turnState);
    this.store.select(fromRoot.getRoleState).subscribe(roleState => this.gameState.isFirstPlayerPlaysCrosses = roleState);
    this.playersData$ = this.store.select(fromRoot.getPlayersDataState);
  }

}
