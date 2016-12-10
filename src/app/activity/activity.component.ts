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

  private subscription: Subscription;

  private displayFormPopup = false;

  private offset = 0;
  private nbActivities = 20;
  private activitiesCount;
  private pageCount = 0;

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

      if (!this.curId) {
        this.getDefaultId();
      } else {
        this.getActivities();
      }
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

  getDefaultId() {
    this.pageService.getDefaultActivity().then(res => {
      if (!res) { return; }
      this.curId = res.page._id;
      this.getActivities();
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

  activities = [
    {
      'title' : 'Booling',
      'text' : 'Lorem booling dolor sit amet, sed probo adolescens te. Nec ea \
      solet percipitur. Velit quando commodo sed ut, paulo soluta quaerendum \
      vix ut, id aliquip constituam pri. Ex quo solet molestie. Pertinax \
      hendrerit contentiones ei mea. Eu solet dolorem apeirian his.\
      \
      Ei per porro harum, expetenda cotidieque has at. Error omnes sea an, in \
      nec erat iracundia, eligendi efficiendi pri et. Nam mutat consequat in, \
      sed diam luptatum ad. Id usu novum sonet argumentum. Forensibus \
      quaerendum eam no, erat prima ea mel, id habeo essent graecis nam.',
      'participants' : ['Roger', 'Benoit', 'Un débile', 'Jean']
    },
    {
      'title' : 'Lancer de nain',
      'text' : 'Lorem nain dolor sit amet, sed probo adolescens te. Nec ea \
      solet percipitur. Velit quando commodo sed ut, paulo soluta quaerendum \
      vix ut, id aliquip constituam pri. Ex quo solet molestie. Pertinax \
      hendrerit contentiones ei mea. Eu solet dolorem apeirian his.',
      'participants' : ['Aragorn', 'Legolas', 'Gimli'],
      'mimetype' : 'image/png',
      'media' : 'http://lorempixel.com/1080/720/'
    },
    {
      'title' : 'Calcul d\'intégrale',
      'text' : 'Lorem intégrale dolor sit amet, sed probo adolescens te. Nec \
      ea solet percipitur. Velit quando commodo sed ut, paulo soluta \
      quaerendum vix ut, id aliquip constituam pri. Ex quo solet molestie. \
      Pertinax hendrerit contentiones ei mea. Eu solet dolorem apeirian his.',
      'participants' : ['Un Matheux', 'Un autre Matheux']
    }
  ];

}
