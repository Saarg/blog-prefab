import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ConfigService } from './../../services/config.service';
import { PageService } from './../../services/page.service';
import { UserService } from './../../services/user.service';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.css'],
  providers: [ConfigService, PageService, UserService]
})
export class ConfigComponent implements OnInit {

  public token = null;
  public pages = [];
  public pageTypes = ['article', 'activity', 'gallery'];
  private newPage = { name: 'New page', description: '', type: 0, position: -1, inNav: true };

  public curPage = { name: 'New page', description: '', type: 0, position: -1, inNav: true };

  constructor(
    private router: Router,
    private configService: ConfigService,
    private userService: UserService,
    private pageService: PageService
  ) { }

  ngOnInit() {
    this.token = localStorage ? localStorage.getItem('AuthToken') : null;

    if (!this.userService.verifyToken(this.token)) {
      this.router.navigate(['/login']);
    }

    this.getPages();
  }

  getPages() {
    this.pageService.getPages().then(res => {
      if (!res) { return; }
      this.pages = res.pages ? res.pages : this.pages;
      this.curPage = this.pages ? this.pages[0] : this.newPage;
    });
  }

  addPage() {
    console.log('adding page ' + this.curPage.name);

    this.curPage.position = this.pages.length;
    this.pageService.addPage(this.curPage).then(res => {
      if (!res) { return; }
      if (res.success) {
        this.pages.push(res.page);
        this.curPage = res.page;
      }
    });
  }

  editPage() {
    console.log('editing page ' + this.curPage.name);
    console.log(this.curPage);

    this.pageService.editPage(this.curPage).then(res => {
      if (!res) { return; }
      if (res.success) {
        this.pages[this.pages.indexOf(this.curPage)] = res.page;
        this.curPage = res.page;
      }
    });
  }

  deletePage() {
    console.log('deleting page ' + this.curPage.name);
    this.pageService.deletePage(this.curPage).then(res => {
      if (!res) { return; }
      this.pages.splice(this.pages.indexOf(this.curPage), 1);
    });
  }

}