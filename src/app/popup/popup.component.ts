import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent implements OnInit {

      @Input() popupTitle : string;
      @Output() onClose : EventEmitter = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges() {
    console.log(this.popupTitle);
  }

  launchEvent()
  {
    this.onClose.next();
  }

}
