import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { appConstants } from '../shared/appConstants';
import {IssueType, Priority} from '../shared/models/enum.models';

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
  @Input() editable = false;
  @Input() title: string;
  @Input() description: string;
  @Input() author: string;
  @Input() tags: [];
  @Input() image: string;
  @Input() issueType?: string;
  @Input() priority?: string;
  @Input() createdAt: Date;
  backgroundColor: string;

  constructor() { }

  ngOnInit() {
  }

}
