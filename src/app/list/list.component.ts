import {Component, Input, OnInit} from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {Card, List} from '../shared/models/schema.model';
import {EditCardComponent} from '../edit-card/edit-card.component';
import {DeleteCardComponent} from '../delete-card/delete-card.component';
import {MatDialog} from '@angular/material/dialog';
import {DateService} from '../shared/services/date.service';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  @Input() lists: List[];


  constructor(private _dialog: MatDialog,
              public dateService: DateService,
  ) {
  }

  ngOnInit(): void {
    this.addDateEachDay(this.dateService.getLocaleDateFormat(new Date()));
  }

  addDateEachDay(daysOfWeek: string[]) {
    this.lists = this.lists.map((x, i) => {
       return {
          cards: x.cards,
          id: x.id,
          title:  i < daysOfWeek.length - 1 ? daysOfWeek[i] : x.title,
        } as List;
      }
    );
  }

  /**
   * An array of all track ids. Each id is associated with a `cdkDropList` for the
   * track talks. This property can be used to connect all drop lists together.
   */
  trackIds(listIndex): string[] {
    return this.lists.map(card => card.id);
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
    // Use the injected dialog service to launch the previously created edit-card
    // component. Once the dialog closes, we assign the updated talk data to
    // the specified talk.
    this._dialog.open(EditCardComponent, {data: {card: card, edit}, width: '500px'})
      .afterClosed()
      .subscribe(newCardData => {
          if (!newCardData) {
            return;
          }
          edit ? Object.assign(card, newCardData) : list.cards.push(newCardData);
        }
      );
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
