import { Component, Input, OnInit } from '@angular/core';
import { Ship } from 'src/app/pages/shared/models/game.models';

@Component({
  selector: 'app-ships-display',
  templateUrl: './ships-display.component.html',
  styleUrls: ['./ships-display.component.sass']
})
export class ShipsDisplayComponent implements OnInit {

  @Input() ships: Ship[];
  constructor() { }

  ngOnInit(): void {
  }

}
