import { Component, OnInit } from '@angular/core';
import * as fromRoot from './app.reducer';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Player, PlayersData } from './shared/interfaces';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  isOngoingGame$: Observable<boolean>;
  playersData$: Observable<PlayersData>;

  constructor(private store: Store<fromRoot.State>) {}

  ngOnInit() {
    this.isOngoingGame$ = this.store.select(fromRoot.getScreenState);
    this.playersData$ = this.store.select(fromRoot.getPlayersDataState);
  }

}
