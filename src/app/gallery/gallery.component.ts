import { Subscription } from 'rxjs';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { MediaService } from './../../services/media.service';
import { PageService } from './../../services/page.service';


@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css'],
  providers: [MediaService, PageService]
})
export class GalleryComponent implements OnInit {

  public token = null;

  private subscription: Subscription;

  public curId = null;

  public images = [];

  private popupMedia = null;
  private displayFormPopup = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private changeDetectorRef: ChangeDetectorRef,
    private mediaService: MediaService,
    private pageService: PageService
  ) { }

  ngOnInit() {
    this.token = localStorage ? localStorage.getItem('AuthToken') : null;

    this.subscription = this.route.params.subscribe((param: any) => {
      this.curId = param['id'];

      if (!this.curId) {
        this.getDefaultId();
      } else {
        this.getMedias();
      }
    });
  }

  getMedias() {
    this.mediaService.getMediasByPage(this.curId).then((res) => {
      if (!res) { return; }
      if (res.success) {
        // TODO succes feedback
        this.images = res.medias;
      } else {
        // TODO display error
        console.error(res.message);
      }
    });
  }

  getDefaultId() {
    this.pageService.getDefaultGallery().then(res => {
      if (!res) { return; }
      this.curId = res.page._id;
      this.getMedias();
    });
  }

  newMedia(e) {
    this.images.unshift(e);
  }

  displayMedia(image)
  {
    this.popupMedia = image;
  }

  onDisplayMediaClose()
  {
    this.popupMedia = null;
  }

  showFormPopup()
  {
    this.displayFormPopup = true;
  }

  formPopupOnClose()
  {
    this.displayFormPopup = false;
  }
}
