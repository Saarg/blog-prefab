import { Component, Input, Output, EventEmitter, OnInit, OnChanges } from '@angular/core';

@Component({
  selector: 'app-form-list',
  templateUrl: './form-list.component.html',
  styleUrls: ['./form-list.component.css']
})
export class FormListComponent implements OnInit, OnChanges {

  @Input() title: String;
  @Input() newItem: Object;
  @Input() items: Object[];

  public curItem: Object;
  @Output() selectedItem = new EventEmitter();

  constructor() { }

  ngOnInit() {
    this.curItem = this.newItem;
  }

  ngOnChanges() {
    this.curItem = this.newItem;
    console.log(this.items);
  }

  selectItem(item) {
    this.curItem = item;
    this.selectedItem.next(this.curItem);
  }

}
