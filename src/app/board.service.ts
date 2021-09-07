import { Injectable } from '@angular/core';
import { Board } from './shared/models/schema.model';

@Injectable({
  providedIn: 'root'
})
export class BoardService {

  private _board: Board = require('./board.json');

  getBoard(): Board {
    return this._board;
  }
}
