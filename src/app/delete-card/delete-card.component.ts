import { Component, OnInit, Inject } from '@angular/core';
// import { MAT_DIALOG_DATA } from '@angular/material';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Card } from '../shared/models/schema.model';

@Component({
  selector: 'app-delete-card',
  templateUrl: './delete-card.component.html',
  styleUrls: ['./delete-card.component.scss']
})
export class DeleteCardComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public card: Card) {}

  ngOnInit() {
  }

}
