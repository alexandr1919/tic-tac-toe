import { AfterViewInit, Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-start-game',
  templateUrl: './start-game.component.html',
  styleUrls: ['./start-game.component.scss']
})
export class StartGameComponent implements OnInit, AfterViewInit {
  @ViewChild('firstPlayerName') firstPlayerNameField: ElementRef;
  @Output() onGameStarted: EventEmitter<string[]> = new EventEmitter();
  isSubmitted: boolean;
  startGameForm = this.fb.group({
    firstPlayer: ['', Validators.required],
    secondPlayer: ['', Validators.required]
  });

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.firstPlayerNameField.nativeElement.focus();
  }

  startGame() {
    this.isSubmitted = true;
    if (this.startGameForm.valid) {
      this.onGameStarted.emit([this.startGameForm.value.firstPlayer, this.startGameForm.value.secondPlayer]);
    }
  }

}
