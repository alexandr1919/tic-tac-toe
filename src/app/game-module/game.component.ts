import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as fromApp from '../app.reducer';
import { Observable } from 'rxjs';
import { Player } from '../shared/interfaces';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  store$: Observable<boolean>;
  isOngoingGame = false;
  firstPlayer: Player = {
    score: 0,
    name: ''
  };
  secondPlayer: Player = {
    score: 0,
    name: ''
  };


  constructor(private store: Store<{app: fromApp.State}>) {
  }

  ngOnInit() {
    // fix
    this.store.subscribe((res) => {
      this.isOngoingGame = res.app.isOngoingGame;
      this.firstPlayer.score = res.app.firstPlayer.score;
      this.secondPlayer.score = res.app.secondPlayer.score;
      this.firstPlayer.name = res.app.firstPlayer.name;
      this.secondPlayer.name = res.app.secondPlayer.name;
      console.log(res);
    });


  }

}
