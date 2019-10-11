import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as fromApp from '../app.reducer';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  store$: Observable<number>

  constructor(private store: Store<{app: fromApp.State}>) {
    this.store$ = store.pipe(select('startGame')); /// fix
  }

  ngOnInit() {
  }

}
