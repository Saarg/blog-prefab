import { Component, OnInit, OnChanges, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent implements OnInit, OnChanges {

  @Input() popupTitle: String;
  @Input() popupWidth;
  @Output() onClose: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges() {
    this.popupWidth = this.popupWidth > 9 ? 9 : this.popupWidth;
    this.popupWidth = this.popupWidth < 5 ? 5 : this.popupWidth;
  }

  launchEvent() {
    this.onClose.next();
  }

}
