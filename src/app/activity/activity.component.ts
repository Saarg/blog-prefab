import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.css']
})
export class ActivityComponent implements OnInit {

  activities = [
    {
      'title' : 'Booling',
      'text' : 'Lorem booling dolor sit amet, sed probo adolescens te. Nec ea \
      solet percipitur. Velit quando commodo sed ut, paulo soluta quaerendum \
      vix ut, id aliquip constituam pri. Ex quo solet molestie. Pertinax \
      hendrerit contentiones ei mea. Eu solet dolorem apeirian his.\
      \
      Ei per porro harum, expetenda cotidieque has at. Error omnes sea an, in \
      nec erat iracundia, eligendi efficiendi pri et. Nam mutat consequat in, \
      sed diam luptatum ad. Id usu novum sonet argumentum. Forensibus \
      quaerendum eam no, erat prima ea mel, id habeo essent graecis nam.',
      'participants' : ['Roger', 'Benoit', 'Un débile', 'Jean']
    },
    {
      'title' : 'Lancer de nain',
      'text' : 'Lorem nain dolor sit amet, sed probo adolescens te. Nec ea \
      solet percipitur. Velit quando commodo sed ut, paulo soluta quaerendum \
      vix ut, id aliquip constituam pri. Ex quo solet molestie. Pertinax \
      hendrerit contentiones ei mea. Eu solet dolorem apeirian his.',
      'participants' : ['Aragorn', 'Legolas', 'Gimli'],
      'mimetype' : 'image/png',
      'media' : 'http://lorempixel.com/1080/720/'
    },
    {
      'title' : 'Calcul d\'intégrale',
      'text' : 'Lorem intégrale dolor sit amet, sed probo adolescens te. Nec \
      ea solet percipitur. Velit quando commodo sed ut, paulo soluta \
      quaerendum vix ut, id aliquip constituam pri. Ex quo solet molestie. \
      Pertinax hendrerit contentiones ei mea. Eu solet dolorem apeirian his.',
      'participants' : ['Un Matheux', 'Un autre Matheux']
    }
  ];

  constructor() { }

  ngOnInit() {
  }

  joinInButtonCB(i) {
    let email = prompt('Please enter your Email');

    if (email != null && email !== '') {
      this.activities[i].participants.push(email);
    }
  }

  goTo(destination) {
    // this will scroll the page up
    window.location.hash = destination;

    // after page scrolls up, scroll down to correct level
    // https://github.com/angular/angular/issues/6595
    setTimeout(() => {
      document.querySelector('#' + destination).parentElement.scrollIntoView();
    });
  }

}
