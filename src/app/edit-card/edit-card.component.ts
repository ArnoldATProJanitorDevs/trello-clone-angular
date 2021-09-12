import {Component, OnInit, Inject} from '@angular/core';
// import { MAT_DIALOG_DATA, MatDialogRef, MatChipInputEvent } from '@angular/material';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef, MatDialog} from '@angular/material/dialog';
import {ColorPickerDialogComponent} from '../shared/components/color-picker-dialog/color-picker-dialog.component';
import {Card, Epic} from '../shared/models/schema.model';
import {MatChipInputEvent} from '@angular/material/chips';
import {appConstants} from '../shared/appConstants';

@Component({
  selector: 'app-edit-card',
  templateUrl: './edit-card.component.html',
  styleUrls: ['./edit-card.component.scss']
})
export class EditCardComponent implements OnInit {

  formGroup: FormGroup;
  issueTypesArrayWithColor = Object.values(appConstants.issueTypeListWithColor);

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { epics: Epic[], card: Card, edit: boolean },
    private dialogRef: MatDialogRef<EditCardComponent>,
    public formBuilder: FormBuilder,
    public colorPickerdialog: MatDialog
  ) {
  }

  ngOnInit() {
    const card = this.data && this.data.card ? this.data.card : null;
    this.formGroup = this.formBuilder.group({
      text: [card && card.text ? card.text : '', Validators.required],
      speaker: [card && card.speaker ? card.speaker : '', Validators.required],
      image: [card && card.image ? card.image : ''],
      tags: [card && card.tags ? card.tags : []],
      issueType: [card && card.issueType ? card.issueType : ''],
      createdAt: [card && card.createdAt ? card.createdAt : new Date()],
      id: [card && card.id ? card.id : ''],
      allEpics: [this.data.epics],
      linkToEpic: [this.data.card.linkedEpic ? this.data.card.linkedEpic : this.data.epics]
    });
  }

  onSubmit() {
    this.dialogRef.close(this.formGroup.value);
  }

  removeTag(tag: string) {
    // Remove the tag from the tag control's value.
    const tagsControl = this.formGroup.get('tags');
    tagsControl.value.splice(tagsControl.value.indexOf(tag), 1);
  }

  addTag(event: MatChipInputEvent) {
    const tagsControl = this.formGroup.get('tags');

    // Create a new array of tags, if the talk doesn't have any,
    // otherwise add the new tag to the existing array.
    if (tagsControl.value) {
      tagsControl.value.push({name: event.value, color: '#e0e0e0'});
    } else {
      tagsControl.setValue([event.value]);
    }

    // Clear the input's value once the tag has been added.
    event.input.value = '';
  }

  removeEpic() {
    this.formGroup.patchValue({
      linkToEpic: null,
    });
  }

  openColorPickerDialog(tag): void {
    const dialogRef = this.colorPickerdialog.open(ColorPickerDialogComponent, {
      // width: '250px',
      data: {},
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result) {
        tag.color = result;
      }
    });
  }
}

