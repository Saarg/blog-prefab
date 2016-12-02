import { Subscription } from 'rxjs';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { MediaService } from './../../services/media.service';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css'],
  providers: [MediaService]
})
export class GalleryComponent implements OnInit {

  public token = null;

  private subscription: Subscription;

  public curId = null;

  public images = [
    {
      "mimetype" : "image/png",
      "media" : "http://lorempixel.com/640/480/"
    },
    {
      "mimetype" : "image/png",
      "media" : "http://lorempixel.com/500/500/"
    },
    {
      "mimetype" : "image/png",
      "media" : "http://lorempixel.com/1080/720/"
    },
    {
      "mimetype" : "image/png",
      "media" : "http://lorempixel.com/350/200/"
    },
    {
      "mimetype" : "image/png",
      "media" : "http://lorempixel.com/300/300/"
    },
    {
      "mimetype" : "image/png",
      "media" : "http://lorempixel.com/240/120/"
    },
    {
      "mimetype" : "image/png",
      "media" : "http://lorempixel.com/666/666/"
    },
    {
      "mimetype" : "image/png",
      "media" : "http://lorempixel.com/340/340/"
    },
    {
      "mimetype" : "image/png",
      "media" : "http://lorempixel.com/350/100/"
    },
    {
      "mimetype" : "image/png",
      "media" : "http://lorempixel.com/600/300/"
    }
  ]

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private changeDetectorRef: ChangeDetectorRef,
    private mediaService: MediaService
  ) { }

  ngOnInit() {
    this.token = localStorage ? localStorage.getItem('AuthToken') : null;

    this.subscription = this.route.params.subscribe((param: any) => {
      this.curId = param['id'];
    });

    this.getMedias();
  }


  getMedias() {
    this.mediaService.getMediasByPage(this.curId).then((res) => {
      if(!res) { return }
      if(res.success) {
        //TODO succes feedback
        this.images = res.medias;
      } else {
        // TODO display error
        console.error(res.message);
      }
    });
  }

  newMedia(e) {
    this.images.unshift(e);
  }
}
