import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';

import { RESULT } from '../../shared/util';

@Component({
  selector: 'app-finish-game',
  templateUrl: './finish-game.component.html',
  styleUrls: ['./finish-game.component.scss']
})
export class FinishGameComponent implements OnChanges {
  @Input() outcome: string;
  @Output() newGameStarted = new EventEmitter<any>();
  isDraw: boolean;

  ngOnChanges() {
    this.isDraw = this.outcome === RESULT.DRAW;
  }

  startNewGame() {
    this.newGameStarted.emit();
  }

}
