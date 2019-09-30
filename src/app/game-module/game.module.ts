import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StartGameComponent } from './start-game/start-game.component';
import { EndGameComponent } from './end-game/end-game.component';
import { CurrentGameComponent } from './current-game/current-game.component';
import { GameComponent } from './game.component';

@NgModule({
  declarations: [
    StartGameComponent,
    EndGameComponent,
    CurrentGameComponent,
    GameComponent
  ],
  imports: [
    CommonModule
  ]
})
export class GameModule { }
