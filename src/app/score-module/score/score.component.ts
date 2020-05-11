import { Component, Input } from '@angular/core';

import { TURN_STATE } from '../../shared/util';

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.scss']
})
export class ScoreComponent {
  @Input() playersData;
  @Input() gameState;

  get isFirstPlayerTurn() {
    return this.gameState.isFirstPlayerPlaysCrosses &&
      this.gameState.turn === TURN_STATE.CROSS || !this.gameState.isFirstPlayerPlaysCrosses && this.gameState.turn === TURN_STATE.NOUGHT;
  }

}
