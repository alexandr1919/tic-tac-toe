import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromRoot from '../../app.reducer';

@Component({
  selector: 'app-current-game',
  templateUrl: './current-game.component.html',
  styleUrls: ['./current-game.component.scss']
})
export class CurrentGameComponent implements OnInit {
  isOngoingGame$: Observable<boolean>;

  constructor(private store: Store<fromRoot.State> ) { }

  ngOnInit() {
    this.isOngoingGame$ = this.store.select(fromRoot.getBaseGameState);
  }

  shot() {
    console.log('shooted')
  }

}
