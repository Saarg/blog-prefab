import { Component, OnInit, OnChanges, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent implements OnInit, OnChanges {

      @Input() popupTitle: String;
      @Output() onClose: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges() {
    console.log(this.popupTitle);
  }

  launchEvent() {
    this.onClose.next();
  }

}
