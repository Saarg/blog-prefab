import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
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

  public logo;
  public banner;

  public pages = [];
  public pageTypes = ['article', 'activity', 'gallery'];
  private newPage = { name: 'New page', description: '', type: 0, position: -1, inNav: true };

  public curPage = { name: 'New page', description: '', type: 0, position: -1, inNav: true };

  public users = [];
  private newUser = { name: 'new user', password: '', accessLevel: 0 };

  public curUser = { name: 'new user', password: '', accessLevel: 0 };

  public infos = [];
  public infoscpy = [];
  public newInfo = 'new info';
  public partners = [];
  public partnerscpy = [];
  public newPartner = 'new partner';
  public contacts = [];
  public contactscpy = [];
  public newContact = 'new contact';

  constructor(
    private router: Router,
    private changeDetectorRef: ChangeDetectorRef,
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
    this.getInfos();
    this.getPartners();
    this.getContact();
    this.getUsers();
  }

  logoChange(input) {
    console.log(input.files);
    const file = input.files;
    let reader = new FileReader();
    if (file[0]) {
      reader.onload = () => {
        this.logo = reader.result;
        console.log(this.logo);
      };

      reader.readAsDataURL(file[0]);
    } else {
      this.changeDetectorRef.detectChanges();
    }
  }

  bannerChange(input) {
    const file = input.files;
    let reader = new FileReader();
    if (file[0]) {
      reader.onload = () => {
        this.banner = reader.result;
        console.log(this.banner);
      };

      reader.readAsDataURL(file[0]);
    } else {
      this.changeDetectorRef.detectChanges();
    }
  }

  editConfig(key, value) {
    this.configService.setValue(key, value).then(res => {
      if (!res || !res.config) { return; }
      this[res.config.key] = null;
    })
  }

  getPages() {
    this.pageService.getPages().then(res => {
      if (!res) { return; }
      this.pages = res.pages.length ? res.pages : this.pages;
      this.curPage = this.pages.length ? this.pages[0] : this.newPage;
    });
  }

  selectPage(page) {
    this.curPage = page;
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

  movePageUp() {
    let page1 = this.pages[this.pages.indexOf(this.curPage)];
    let page2 = this.pages[this.pages.indexOf(this.curPage) - 1];
    let i = this.pages.indexOf(this.curPage);

    let pos1 = page1.position;
    page1.position = page2.position;
    this.pageService.editPage(page1).then(res => {
      if (!res) { return; }
      if (res.success) {
        this.pages[i - 1] = page1;
      }
    });

    page2.position = pos1;
    this.pageService.editPage(page2).then(res => {
      if (!res) { return; }
      if (res.success) {
        this.pages[i] = page2;
      }
    });
  }

  movePageDown() {
    let page1 = this.pages[this.pages.indexOf(this.curPage)];
    let page2 = this.pages[this.pages.indexOf(this.curPage) + 1];
    let i = this.pages.indexOf(this.curPage);

    let pos1 = page1.position;
    page1.position = page2.position;
    this.pageService.editPage(page1).then(res => {
      if (!res) { return; }
      if (res.success) {
        this.pages[i + 1] = page1;
      }
    });

    page2.position = pos1;
    this.pageService.editPage(page2).then(res => {
      if (!res) { return; }
      if (res.success) {
        this.pages[i] = page2;
      }
    });
  }

  getUsers() {
    this.userService.getUsers().then(res => {
      if (!res) { return; }
      if (res.success) {
        this.users = res.users;
        console.log(res.users);
      }
    });
  }

  selectUser(user) {
    this.curUser = user;
  }

  getInfos() {
    this.configService.getValue('infos').then(res => {
      if (!res) { return; }
      this.infos = res.config ? res.config[0].value : this.infos;
      this.infoscpy = Array.from(this.infos);
    });
  }

  addInfo(info) {
    this.infos.push(info);

    this.saveInfos();
  }

  editInfo(info) {
    this.saveInfos();
  }

  deleteInfo(info) {
    this.infos.splice(this.infos.indexOf(info), 1);

    this.saveInfos();
  }

  saveInfos() {
    this.configService.setValue('infos', this.infos).then(res => {
      if (!res) { return; }
      this.infos = res.config ? res.config.value : this.infos;
      this.infoscpy = Array.from(this.infos);
    });
  }

  getPartners() {
    this.configService.getValue('partners').then(res => {
      if (!res) { return; }
      this.partners = res.config ? res.config[0].value : this.partners;
      this.partnerscpy = Array.from(this.partners);
    });
  }

  addPartner(partner) {
    this.partners.push(partner);

    this.savePartners();
  }

  editPartner(partner) {
    this.savePartners();
  }

  deletePartner(partner) {
    this.partners.splice(this.partners.indexOf(partner), 1);

    this.savePartners();
  }

  savePartners() {
    this.configService.setValue('partners', this.partners).then(res => {
      if (!res) { return; }
      this.partners = res.config ? res.config.value : this.partners;
      this.partnerscpy = Array.from(this.partners);
    });
  }

  getContact() {
    this.configService.getValue('contact').then(res => {
      if (!res) { return; }
      this.contacts = res.config ? res.config[0].value : this.contacts;
      this.contactscpy = Array.from(this.contacts);
    });
  }

  addContact(contact) {
    this.contacts.push(contact);

    this.saveContacts();
  }

  editContact(contact) {
    this.saveContacts();
  }

  deleteContact(contact) {
    this.contacts.splice(this.contacts.indexOf(contact), 1);

    this.saveContacts();
  }

  saveContacts() {
    this.configService.setValue('contact', this.contacts).then(res => {
      if (!res) { return; }
      this.contacts = res.config ? res.config.value : this.contacts;
      this.contactscpy = Array.from(this.contacts);
    });
  }

}
