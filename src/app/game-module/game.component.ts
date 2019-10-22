import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromRoot from '../app.reducer';
import { Observable } from 'rxjs';
import { Player, PlayersData } from '../shared/interfaces';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  isOngoingGame$: Observable<boolean>;
  playersData$: Observable<PlayersData>;
  firstPlayer: Player = {
    score: 0,
    name: ''
  };
  secondPlayer: Player = {
    score: 0,
    name: ''
  };


  constructor(private store: Store<fromRoot.State>) {
  }

  ngOnInit() {
    this.isOngoingGame$ = this.store.select(fromRoot.getGameState);
    this.playersData$ = this.store.select(fromRoot.getPlayersData);
    this.playersData$.subscribe((res) => {
      this.firstPlayer = res.firstPlayer;
      this.secondPlayer = res.secondPlayer;
    });
  }
}
