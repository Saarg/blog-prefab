import { Component, OnInit } from '@angular/core';
import { ConfigService } from './../config.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers: [ConfigService]
})
export class HeaderComponent implements OnInit {

  public logo;
  public banner;

  constructor(private configService: ConfigService) { }

  ngOnInit() {
    this.getLogos();
  }

  getLogos(): void {
    this.configService.getLogo().then(logo => this.logo = logo);
    this.configService.getBanner().then(banner => this.banner = banner);
  }

}
