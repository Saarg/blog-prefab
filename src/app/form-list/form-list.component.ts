import { Component, Input, Output, EventEmitter, OnInit, OnChanges } from '@angular/core';

@Component({
  selector: 'app-form-list',
  templateUrl: './form-list.component.html',
  styleUrls: ['./form-list.component.css']
})
export class FormListComponent implements OnInit, OnChanges {

  @Input() title: String;
  @Input() singular: String;
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
    this.selectedItem.next(this.curItem);

    if(!this.singular) {
      this.singular = this.title.toLowerCase();
      if(this.singular.slice(-1) === 's') {
        this.singular = this.singular.slice(0, -1);
      }
    }
  }

  selectItem(item) {
    this.curItem = item;
    this.selectedItem.next(this.curItem);
  }

}
