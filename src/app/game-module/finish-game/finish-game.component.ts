import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-end-game',
  templateUrl: './finish-game.component.html',
  styleUrls: ['./finish-game.component.scss']
})
export class FinishGameComponent implements OnInit {
  @Input() winner: string;

  constructor() { }

  ngOnInit() {
  }

}
