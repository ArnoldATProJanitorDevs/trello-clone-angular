import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Epic} from '../shared/models/schema.model';

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

  constructor() {
  }

  ngOnInit(): void {

  }

}
