import {Component, Input, OnInit} from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {Card, Epic, List} from '../shared/models/schema.model';
import {EditCardComponent} from '../edit-card/edit-card.component';
import {DeleteCardComponent} from '../delete-card/delete-card.component';
import {MatDialog} from '@angular/material/dialog';
import {DateService} from '../shared/services/date.service';
import {CommonFunctionsService} from '../shared/services/common-functions.service';
import {Priority} from '../shared/models/enum.models';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  @Input() lists: List[];
  @Input() epics: Epic[];

  constructor(private _dialog: MatDialog,
              public dateService: DateService,
              private _commonFunctions: CommonFunctionsService,
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
          title: i < daysOfWeek.length - 1 ? daysOfWeek[i] : x.title,
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
    this._dialog.open(EditCardComponent, {data: {epics: this.epics, card: card, edit}, width: '500px'})
      .afterClosed()
      .subscribe(newCard => {
          if (!newCard) {
            return;
          }
          this.getIdForCard(newCard);

          if (newCard.linkToEpic) {

            newCard.allEpics = newCard.allEpics.map(e => {
              e.linkedCards = e.linkedCards.filter(lc => lc.id !== newCard.id);

              if (e.id === newCard.linkToEpic.id) {
                e.linkedCards.push(newCard);
              }
              return e;
            });
          } else {
            newCard.allEpics = newCard.allEpics.map(e => {
              e.linkedCards = e.linkedCards.filter(lc => lc.id !== newCard.id);
              return e;
            });

            newCard.linkedEpic = null;
          }

          edit ? Object.assign(card, newCard) : list.cards.push(newCard);
        }
      );
  }

  private getIdForCard(newCardData) {
    newCardData.id ? newCardData.id : this._commonFunctions.getUuidV4();
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
