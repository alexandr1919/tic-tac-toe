import { Component, OnInit } from '@angular/core';
import { Player, PlayersData } from '../../shared/interfaces';
import { Observable } from 'rxjs';
import * as fromRoot from '../../app.reducer';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.scss']
})
export class ScoreComponent implements OnInit {
  playersData$: Observable<PlayersData>;

  firstPlayer: Player;
  secondPlayer: Player;

  constructor(private store: Store<fromRoot.State>) { }

  ngOnInit() {
    this.playersData$ = this.store.select(fromRoot.getPlayersDataState);
    this.playersData$.subscribe(res => {
      this.firstPlayer = res.firstPlayer;
      this.secondPlayer = res.secondPlayer;
    });


  }

}
