import { Component, Input, OnChanges } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-youtube-embended',
  templateUrl: './youtube-embended.component.html',
  styleUrls: ['./youtube-embended.component.css']
})
export class YoutubeEmbendedComponent implements OnChanges {
  @Input() url;
  public embendedUrl;

  constructor(private sanitizer: DomSanitizer) {
    this.url = this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/zbTEozCiv-I');
  }

  ngOnChanges() {
    this.embendedUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.url.replace('watch?v=', 'embed/'));
  }
}
