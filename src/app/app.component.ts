import { Component } from '@angular/core';
import {BoardService} from './board.service';
import {Board} from './shared/models/schema.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  board: Board = undefined;
  constructor(private _boardService: BoardService) {
    this.board = _boardService.getBoard();
  }
}
