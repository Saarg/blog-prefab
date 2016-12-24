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
    this.selectedItem.next(this.curItem);
  }

  ngOnChanges() {
    this.curItem = this.items[0];
    console.log(this.items);
    this.selectedItem.next(this.curItem);
  }

  selectItem(item) {
    this.curItem = item;
    this.selectedItem.next(this.curItem);
  }

}
