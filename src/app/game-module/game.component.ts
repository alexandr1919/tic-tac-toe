import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromRoot from '../app.reducer';
import * as fromPlayersData from '../store/reducers/players-data.reducer';
import { changeScreen, newGameAction, nextTurn } from '../store/actions/game.actions';
import { setPlayersData } from '../store/actions/players-data.actions';
import { CurrentGameComponent } from './current-game/current-game.component';
import { board, RESULT, SCREEN_STATES, TURN_STATE } from '../shared/util';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  @ViewChild(CurrentGameComponent)
  private currentGameComponent: CurrentGameComponent;
  @Input() playersData: fromPlayersData.State;
  isFirstPlayerPlaysCrosses: boolean;
  outcome: string;
  turn: string;
  isStartScreen: boolean;

  constructor(private store: Store<fromRoot.State>) {}

  ngOnInit() {
    this.store.select(fromRoot.getGameState).subscribe(gameState => {
      this.isStartScreen = gameState.screenState === SCREEN_STATES.START_SCREEN;
      this.turn = gameState.turn;
      this.isFirstPlayerPlaysCrosses = gameState.isFirstPlayerPlaysCrosses;
    });
  }

  onGameStarted(playerNames) {
    this.store.dispatch(setPlayersData({
      firstPlayer: {
        name: playerNames[0],
        score: 0
      },
      secondPlayer: {
        name: playerNames[1],
        score: 0
      }
    }));
    this.store.dispatch(changeScreen({
      screenState: SCREEN_STATES.ONGOING_GAME,
      isFirstPlayerPlaysCrosses: true,
      turn: TURN_STATE.CROSS
    }));
  }

  attempt(turn) {
    this.store.dispatch(nextTurn({
      turn
    }));
  }

  gameFinished(outcome) {
    if (outcome === RESULT.DRAW) {
      this.store.dispatch(changeScreen({
        screenState: SCREEN_STATES.GAME_FINISHED,
        isFirstPlayerPlaysCrosses: !this.isFirstPlayerPlaysCrosses,
        turn: TURN_STATE.CROSS
      }));
      this.outcome = outcome;
      return;
    }
    if (outcome === RESULT.CROSS) {
      if (this.isFirstPlayerPlaysCrosses) {
        this.outcome = this.playersData.firstPlayer.name;
        this.sendAction('firstPlayer');
      } else {
        this.outcome = this.playersData.secondPlayer.name;
        this.sendAction('secondPlayer');
      }
    } else if (this.isFirstPlayerPlaysCrosses) {
       this.outcome = this.playersData.secondPlayer.name;
       this.sendAction('secondPlayer');
    } else {
      this.outcome = this.playersData.firstPlayer.name;
      this.sendAction('firstPlayer');
    }
  }

  sendAction(winner) {
    switch (winner) {
      case 'firstPlayer':
        this.store.dispatch(setPlayersData({
          firstPlayer: {
            name: this.playersData.firstPlayer.name,
            score: ++this.playersData.firstPlayer.score
          },
          secondPlayer: {
            name: this.playersData.secondPlayer.name,
            score: this.playersData.secondPlayer.score
          }
        }));
        this.store.dispatch(changeScreen({
          screenState: SCREEN_STATES.GAME_FINISHED,
          isFirstPlayerPlaysCrosses: !this.isFirstPlayerPlaysCrosses,
          turn: TURN_STATE.CROSS
        }));
        break;
      case 'secondPlayer':
        this.store.dispatch(setPlayersData({
          firstPlayer: {
            name: this.playersData.firstPlayer.name,
            score: this.playersData.firstPlayer.score
          },
          secondPlayer: {
            name: this.playersData.secondPlayer.name,
            score: ++this.playersData.secondPlayer.score
          }
        }));
        this.store.dispatch(changeScreen({
          screenState: SCREEN_STATES.GAME_FINISHED,
          isFirstPlayerPlaysCrosses: !this.isFirstPlayerPlaysCrosses,
          turn: TURN_STATE.CROSS
        }));
        break;
    }
  }

  onNewGameStarted() {
    this.outcome = null;
    this.currentGameComponent.board = { ...board };
    this.currentGameComponent.isGameFinished = false;
    this.store.dispatch(newGameAction({
      screenState: SCREEN_STATES.ONGOING_GAME,
    }));
  }

}
