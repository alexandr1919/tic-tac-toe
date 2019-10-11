import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';

import * as  fromApp from '../../app.reducer';
import { startGame } from '../../app.actions';

@Component({
  selector: 'app-start-game',
  templateUrl: './start-game.component.html',
  styleUrls: ['./start-game.component.scss']
})
export class StartGameComponent implements OnInit {
  isSubmitted: boolean;
  startgameForm = this.fb.group({
    firstPlayer: ['', Validators.required],
    secondPlayer: ['', Validators.required]
  });

  setNames() {
    this.isSubmitted = true;
    if (this.startgameForm.valid) {
      this.store.dispatch(startGame());
    }
  }

  constructor(private fb: FormBuilder, private store: Store<{app: fromApp.State}>) { }

  ngOnInit() {
  }

}
