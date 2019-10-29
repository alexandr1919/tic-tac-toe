import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-finish-game',
  templateUrl: './finish-game.component.html',
  styleUrls: ['./finish-game.component.scss']
})
export class FinishGameComponent implements OnInit {
  @Input() result: string;

  constructor() { }

  ngOnInit() {
  }

}
