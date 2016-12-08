import { Component, Input, OnChanges } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-youtube-embended',
  templateUrl: './youtube-embended.component.html',
  styleUrls: ['./youtube-embended.component.css']
})
export class YoutubeEmbendedComponent implements OnChanges {
  @Input('url') inputUrl;
  public url;

  constructor(private sanitizer: DomSanitizer) {
    this.url = this.sanitizer.bypassSecurityTrustResourceUrl("https://www.youtube.com/embed/zbTEozCiv-I");
  }

  ngOnChanges() {
    console.log(this.inputUrl);
    this.url = this.sanitizer.bypassSecurityTrustResourceUrl(this.inputUrl.replace("watch?v=", "embed/"));
  }
}
