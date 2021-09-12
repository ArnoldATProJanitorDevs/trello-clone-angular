import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Card, Epic, List} from '../shared/models/schema.model';
import {EditCardComponent} from '../edit-card/edit-card.component';
import {MatDialog} from '@angular/material/dialog';
import {EditEpicComponent} from '../edit-epic/edit-epic.component';
import {DeleteCardComponent} from '../delete-card/delete-card.component';
import {CommonFunctionsService} from '../shared/services/common-functions.service';

@Component({
  selector: 'app-epic',
  templateUrl: './epic.component.html',
  styleUrls: ['./epic.component.scss']
})
export class EpicComponent implements OnInit {
  title = 'EPICS';
  @Input() epics: Epic[];
  @Output() edit = new EventEmitter<void>();
  @Output() delete = new EventEmitter<void>();

  constructor(private _dialog: MatDialog,
              private _commonFunctions: CommonFunctionsService
  ) {
  }

  ngOnInit(): void {

  }

  sortBy(toSort: any[], prop: string) {
    return this._commonFunctions.sortBy(toSort, prop);
  }


  addEditEpic(epic: Epic, edit = false) {
    // Use the injected dialog service to launch the previously created edit-card
    // component. Once the dialog closes, we assign the updated talk data to
    // the specified talk.
    this._dialog.open(EditEpicComponent, {data: {epic: epic, edit}, width: '500px'})
      .afterClosed()
      .subscribe(newEpicData => {
          if (!newEpicData) {
            return;
          }
          edit ? Object.assign(epic, newEpicData) : this.epics.push(newEpicData);
        }
      );
  }

  deleteEpic(epic: Epic) {
    // Open a dialog
    this._dialog.open(DeleteCardComponent, {data: epic, width: '500px'})
      .afterClosed()
      .subscribe(response => {
        // Wait for it to close and delete the talk if the user agreed.
        if (response) {
          this.epics.splice(this.epics.indexOf(epic), 1);
        }
      });
  }

  highlightCard($event: Card) {
    const HTMLElement = document.getElementById($event.id);
    const originColor = HTMLElement.style.backgroundColor;
    const epic = this.epics.find(e => {
      return e.linkedCards.find(lc => lc.id === $event.id);
    });

    const epicHTMLElementBGColor = this._commonFunctions.rgba2hex(document.getElementById(epic.id).style.backgroundColor);

    HTMLElement.style.border = '10px solid #' + epicHTMLElementBGColor;

    setTimeout(() => {
      HTMLElement.style.border = 'none';
    }, 1500, originColor);
  }
}
