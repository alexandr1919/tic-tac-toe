import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { StartGameComponent } from './start-game/start-game.component';
import { FinishGameComponent } from './finish-game/finish-game.component';
import { CurrentGameComponent } from './current-game/current-game.component';
import { GameComponent } from './game.component';

@NgModule({
  declarations: [
    StartGameComponent,
    FinishGameComponent,
    CurrentGameComponent,
    GameComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ]
})
export class GameModule { }
