import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {Epic} from '../shared/models/schema.model';
import {MatChipInputEvent} from '@angular/material/chips';
import {ColorPickerDialogComponent} from '../shared/components/color-picker-dialog/color-picker-dialog.component';
import {appConstants} from '../shared/appConstants';

@Component({
  selector: 'app-edit-epic',
  templateUrl: './edit-epic.component.html',
  styleUrls: ['./edit-epic.component.css']
})
export class EditEpicComponent implements OnInit {

  formGroup: FormGroup;
  issueTypesArrayWithColor = Object.values(appConstants.issueTypeListWithColor);
  priorities = Object.values(appConstants.priorityList);

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {epic: Epic, edit: boolean},
    private dialogRef: MatDialogRef<EditEpicComponent>,
    public formBuilder: FormBuilder,
    public colorPickerdialog: MatDialog
  ) {
  }

  ngOnInit() {
    const epic = this.data && this.data.epic ? this.data.epic : null;
    this.formGroup = this.formBuilder.group({
      title: [epic && epic.title ? epic.title : '', Validators.required],
      description : [epic && epic.description ? epic.description : ''],
      priority: [epic && epic.priority ? epic.priority : 'D'],
      estimatedHours: [epic && epic.estimatedHours ? epic.estimatedHours : 'NA'],
      createdAt: [epic && epic.createdAt ? epic.createdAt : new Date()],
      tags: [epic && epic.tags ? epic.tags : []],
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
