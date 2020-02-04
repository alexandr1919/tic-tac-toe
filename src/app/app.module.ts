import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GameModule } from './game-module/game.module';

import { reducers } from './app.reducer';
import { ScoreModule } from './score-module/score.module';

@NgModule({
  declarations: [
    AppComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        GameModule,
        ScoreModule,
        ReactiveFormsModule,
        StoreModule.forRoot(reducers),
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
