import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {appConstants} from '../shared/appConstants';
import {Card, Epic} from '../shared/models/schema.model';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  issueTypesWithColor = appConstants.issueTypeListWithColor;
  prioritiesWithColor = appConstants.priorityList;
  @Output() edit = new EventEmitter<void>();
  @Output() delete = new EventEmitter<void>();
  @Output() highlight = new EventEmitter<Card>();
  @Input() id?: string;
  @Input() editable = false;
  @Input() title: string;
  @Input() description: string;
  @Input() author: string;
  @Input() tags: [];
  @Input() image: string;
  @Input() issueType?: string;
  @Input() priority?: string;
  @Input() createdAt: Date;
  @Input() linkedCards?: Card[];
  @Input() linkedEpic?: Epic;

  backgroundColor: string;

  constructor() {
  }

  ngOnInit() {
  }

}
