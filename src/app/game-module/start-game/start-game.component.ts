import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';

import * as  fromRoot from '../../app.reducer';
import { startGame } from '../../shared/base.actions';

@Component({
  selector: 'app-start-game',
  templateUrl: './start-game.component.html',
  styleUrls: ['./start-game.component.scss']
})
export class StartGameComponent implements OnInit, AfterViewInit {
  @ViewChild('firstPlayerName') firstPlayerNameField: ElementRef;
  isSubmitted: boolean;
  startgameForm = this.fb.group({
    firstPlayer: ['', Validators.required],
    secondPlayer: ['', Validators.required]
  });

  startGame() {
    this.isSubmitted = true;
    if (this.startgameForm.valid) {
      this.store.dispatch(startGame({
        firstPlayerName: this.startgameForm.value.firstPlayer,
        secondPlayerName: this.startgameForm.value.secondPlayer
      }));
    }
  }

  constructor(private fb: FormBuilder, private store: Store<fromRoot.State>) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.firstPlayerNameField.nativeElement.focus();
  }

}
