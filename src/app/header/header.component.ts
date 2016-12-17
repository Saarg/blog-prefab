import { Component, OnInit } from '@angular/core';

import { ConfigService } from './../../services/config.service';
import { PageService } from './../../services/page.service';
import { UserService } from './../../services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers: [ConfigService, PageService, UserService]
})
export class HeaderComponent implements OnInit {

  public token = null;

  public logo;
  public banner;

  public pages= [];
  public newPage = { name: 'New page', description: '', type: 0, position: -1, inNav: true };
  public pageTypes = ['article', 'activity', 'gallery'];

  constructor(
    private configService: ConfigService,
    private userService: UserService,
    private pageService: PageService
  ) { }

  ngOnInit() {
    this.token = localStorage ? localStorage.getItem('AuthToken') : null;

    this.token = this.userService.verifyToken(this.token) ? this.token : null;

    this.getLogos();
    this.getPages();
  }

  getLogos(){
    this.configService.getLogo().then(logo => this.logo = logo);
    this.configService.getBanner().then(banner => this.banner = banner);
  }

  getPages() {
    this.pageService.getPages().then(res => {
      if (!res) { return; }
      this.pages = res.pages ? res.pages : this.pages;
    });
  }

  addPage(type) {
    console.log('adding page ' + this.newPage.name);

    this.newPage.type = type;
    this.newPage.position = this.pages.length;
    this.pageService.addPage(this.newPage).then(res => {
      if (!res) { return; }
      if (res.success) {
        this.pages.push(res.page);
        this.newPage = { name: 'New page', description: '', type: 0, position: -1, inNav: true };
      }
    });
  }

  deletePage(i) {
    console.log('deleting page ' + this.pages[i].name);
    this.pageService.deletePage(this.pages[i]).then(res => {
      if (!res) { return; }
      this.pages.splice(i, 1);
    });
  }
}
