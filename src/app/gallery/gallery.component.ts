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
  public pageInfo = null;

  public images = [];

  private popupMedia = null;
  private displayFormPopup = false;

  private IMG_BASE_NUMBER = 12;
  private mediaShown = 12;
  private mediaCount;
  private gimmeMoreShow = true;

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

      this.getPageInfos();
    });
  }

  getMedias() {
    this.mediaService.getMediasByPage(this.curId, 0, this.mediaShown).then((res) => {
      if (!res) { return; }
      if (res.success) {
        // TODO succes feedback
        this.images = res.medias;
      } else {
        // TODO display error
        console.error(res.message);
      }
    });

    this.getMediasCount();
  }

  getMediasCount() {
    this.mediaService.countMediasByPage(this.curId).then(res => {
      if (!res) { return; }
      this.mediaCount = res ? res : this.mediaCount;
    });

    if (this.mediaShown > this.mediaCount) {
      this.gimmeMoreShow = false;
    }
  }

  getPageInfos() {
    this.pageService.getPage(this.curId).then(res => {
      if (res.success === "false") {
        this.pageService.getDefaultGallery().then(res => {
          if (!res) { return; }
          this.curId = res.page._id;
          this.pageInfo = res.page;
          this.getMedias();
        });
      } else {
        this.pageInfo = res.page;
        this.getMedias();
      }
    });
  }

  newMedia(e) {
    this.images.unshift(e);
  }

  displayMedia(image) {
    this.popupMedia = image;
  }

  onDisplayMediaClose() {
    this.popupMedia = null;
  }

  showFormPopup() {
    this.displayFormPopup = true;
  }

  formPopupOnClose() {
    this.displayFormPopup = false;
  }

  showMoreMedias() {
    this.mediaShown += this.IMG_BASE_NUMBER;
    this.getMedias();
    if (this.mediaShown > this.mediaCount) {
      this.gimmeMoreShow = false;
    };
  }

  deleteMedia(media) {
    this.mediaService.deleteMedia(media).then(res => {
      if (!res) { return; }
    });
    this.onDisplayMediaClose();
    this.getMedias();
  }
}
