import { Component, OnInit } from '@angular/core';

import { ConfigService } from './../../services/config.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
  providers: [ConfigService]
})
export class FooterComponent implements OnInit {

  public infos = [];
  public partners = [];
  public contacts = [];

  constructor(
    private configService: ConfigService
  ) { }

  ngOnInit() {
    this.getInfos();
    this.getPartners();
    this.getContact();
  }

  getInfos() {
    this.configService.getValue('infos').then(res => {
      if (!res) { return; }
      this.infos = res.config ? res.config[0].value.split(',') : this.infos;
    });
  }

  getPartners() {
    this.configService.getValue('partners').then(res => {
      if (!res) { return; }
      this.partners = res.config ? res.config[0].value.split(',') : this.partners;
    });
  }

  getContact() {
    this.configService.getValue('contact').then(res => {
      if (!res) { return; }
      this.contacts = res.config ? res.config[0].value.split(',') : this.contacts;
    });
  }

}
