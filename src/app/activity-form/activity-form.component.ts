import { Subscription } from 'rxjs';
import { Component, OnInit, ChangeDetectorRef, Input, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { ActivityService } from './../../services/activity.service';

@Component({
  selector: 'app-activity-form',
  templateUrl: './activity-form.component.html',
  styleUrls: ['./activity-form.component.css'],
  providers: [ActivityService]
})
export class ActivityFormComponent implements OnInit {

  @Input() activity;
  @Input() pageId: String;
  @Output() newActivityEvent: EventEmitter<Object> = new EventEmitter<Object>();
  @Output() deletedActivityEvent: EventEmitter<Object> = new EventEmitter<Object>();

  private subscription: Subscription;

  public token = null;

  public newActivity = {
    title: 'Enter your title here',
    text: 'Enter a short description here',
    location: 'Event\'s place',
    participants : [],
    page: 0,
    position: -1,
    mimetype: '',
    media: '',
    token: null
  };

  public curId = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private changeDetectorRef: ChangeDetectorRef,
    private activityService: ActivityService
  ) { }

  ngOnInit() {
    this.token = localStorage ? localStorage.getItem('AuthToken') : null;

    this.subscription = this.route.params.subscribe((param: any) => {
      this.curId = param['id'];
    });

    if(!this.activity) {
      this.activity = this.newActivity;
    }
  }

  fileChange(input) {
    this.readFile(input.files);
  }

  readFile(file) {
    // Create the file reader
    let reader = new FileReader();

    // If there is a file
    if (file[0]) {
      // Start reading this file
      reader.onload = () => {
        // After the callback fires do:
        this.activity.media = reader.result;
      };

      reader.readAsDataURL(file[0]);
    } else {
      // When all files are done This forces a change detection
      this.changeDetectorRef.detectChanges();
    }
  }

  editActivity() {
    this.activityService.editActivity(this.activity).then(res => {
      console.log(res);
      if (!res) { return; }
      if (res.success) {
        this.newActivityEvent.next(res.activity);
      }
    });
  }

  deleteActivity() {
    this.activityService.deleteActivity(this.activity).then(res => {
      console.log(res);
      if (!res) { return; }
      if (res.success) {
        this.deletedActivityEvent.next(this.activity);
      }
    });
  }

  submitActivity() {
    // this.activity.text = this.activity.text.replace(/\n/g, "<"+"br/>");
    // using dummi pageid for now
    this.activityService.addActivity(this.activity, this.pageId).then(res => {
      console.log(res);
      if (!res) { return; }
      if (res.success) {
        this.newActivityEvent.next(res.activity);
      }
    });
  }

}
