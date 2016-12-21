import { Subscription } from 'rxjs';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { ActivityService } from './../../services/activity.service';
import { PageService } from './../../services/page.service';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.css'],
  providers: [ActivityService, PageService]
})
export class ActivityComponent implements OnInit {

  public token = null;

  public curId = null;
  public pageInfo = null;

  private subscription: Subscription;

  private displayFormPopup = false;

  private offset = 0;
  private nbActivities = 20;
  private activitiesCount;
  private pageCount = 0;
  public activities = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private changeDetectorRef: ChangeDetectorRef,
    private activityService: ActivityService,
    private pageService: PageService
  ) { }

  ngOnInit() {
    this.token = localStorage ? localStorage.getItem('AuthToken') : null;

    this.subscription = this.route.params.subscribe((param: any) => {
      this.curId = param['id'];

      this.getPageInfos();
    });
  }

  newActivity(e) {
    this.activities.unshift(e);
  }

  getActivities() {
    console.log('requesting with offset ' + this.offset);
    this.activityService.getActivitiesByPage(this.curId, this.offset, this.nbActivities).then(res => {
      if (!res) { return; }
      this.activities = res.activities ? res.activities : this.activities;
    });

    this.getActivitiesCount();
  }

  getActivitiesCount() {
    this.activityService.countActivitiesByPage(this.curId).then(res => {
      if (!res) { return; }
      this.activitiesCount = res ? res : this.activitiesCount;
      this.pageCount = Math.round(0.4 + this.activitiesCount / this.nbActivities);
    });
  }

  getPageInfos() {
    this.pageService.getPage(this.curId).then(res => {
      if (res.success === "false") {
        this.pageService.getDefaultActivity().then(res => {
          if (!res) { return; }
          this.curId = res.page._id;
          this.pageInfo = res.page;
          this.getActivities();
        });
      } else {
        this.pageInfo = res.page;
        this.getActivities();
      }
    });
  }

  joinInButtonCB(i) {
    let email = prompt('Please enter your Email');

    if (email != null && email !== '') {
      this.activities[i].participants.push(email);
    }
  }

  goTo(destination) {
    // this will scroll the page up
    window.location.hash = destination;

    // after page scrolls up, scroll down to correct level
    // https://github.com/angular/angular/issues/6595
    setTimeout(() => {
      document.querySelector('#' + destination).parentElement.scrollIntoView();
    });
  }

  showFormPopup() {
    this.displayFormPopup = true;
  }

  formPopupOnClose() {
    this.displayFormPopup = false;
  }
}
