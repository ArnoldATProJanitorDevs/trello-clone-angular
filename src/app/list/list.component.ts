import {Component, OnInit} from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {Board, Card, List} from '../shared/models/schema.model';
import {EditTalkComponent} from '../edit-talk/edit-talk.component';
import {DeleteCardComponent} from '../delete-card/delete-card.component';
import {BoardService} from '../board.service';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  board: Board = undefined;

  constructor(private _boardService: BoardService, private _dialog: MatDialog) {
    this.board = this._boardService.getBoard();
  }

  ngOnInit(): void {
  }

  /**
   * An array of all track ids. Each id is associated with a `cdkDropList` for the
   * track talks. This property can be used to connect all drop lists together.
   */
  trackIds(boardIndex): string[] {
    return this.board[boardIndex].tracks.map(track => track.id);
  }

  onCardDrop(event: CdkDragDrop<Card[]>) {
    // In case the destination container is different from the previous container, we
    // need to transfer the given talk to the target data array. This happens if
    // a talk has been dropped on a different track.
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }

  onListDrop(event: CdkDragDrop<List[]>) {
    moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
  }

  addEditCard(card: Card, list: List, edit = false) {
    // Use the injected dialog service to launch the previously created edit-talk
    // component. Once the dialog closes, we assign the updated talk data to
    // the specified talk.
    this._dialog.open(EditTalkComponent, {data: {talk: card, edit}, width: '500px'})
      .afterClosed()
      .subscribe(newTalkData => edit ? Object.assign(card, newTalkData) : list.cards.unshift(newTalkData));
  }

  deleteCard(card: Card, list: List) {
    // Open a dialog
    this._dialog.open(DeleteCardComponent, {data: card, width: '500px'})
      .afterClosed()
      .subscribe(response => {
        // Wait for it to close and delete the talk if the user agreed.
        if (response) {
          list.cards.splice(list.cards.indexOf(card), 1);
        }
      });
  }

  filterByDate(cards, asc = 1) {
    cards = [...cards.sort((a: any, b: any) => (asc) * (new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()))];
    console.log(cards);
  }
}
