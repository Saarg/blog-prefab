import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.css']
})
export class ActivityComponent implements OnInit {

  activities = [
    {
      "title" : "Booling",
      "text" : "Lorem booling dolor sit amet, sed probo adolescens te. Nec ea solet percipitur. Velit quando commodo sed ut, paulo soluta quaerendum vix ut, id aliquip constituam pri. Ex quo solet molestie. Pertinax hendrerit contentiones ei mea. Eu solet dolorem apeirian his.\
      \
      Quo te legere dicunt, qui ad nemore singulis, nam nibh audiam an. Mel ex eius consul. Purto inimicus signiferumque sed et. Ex cum gloriatur assueverit, pri soleat delectus theophrastus id. An doctus scripta mei, melius accusata deseruisse per eu. Sit platonem rationibus eu.Lorem ipsum dolor sit amet, nam legere aliquip oportere ea, mea at solet utinam laoreet. Abhorreant eloquentiam per no, vim ipsum ponderum at. Sea cibo dicat sapientem ut, doctus volutpat ius cu. Facete saperet partiendo et usu. Sea suscipiantur necessitatibus in.\
      \
      Ei per porro harum, expetenda cotidieque has at. Error omnes sea an, in nec erat iracundia, eligendi efficiendi pri et. Nam mutat consequat in, sed diam luptatum ad. Id usu novum sonet argumentum. Forensibus quaerendum eam no, erat prima ea mel, id habeo essent graecis nam.",
      "participants" : ["Roger", "Benoit", "Un débile"]
    },
    {
      "title" : "Lancer de nain",
      "text" : "Lorem nain dolor sit amet, sed probo adolescens te. Nec ea solet percipitur. Velit quando commodo sed ut, paulo soluta quaerendum vix ut, id aliquip constituam pri. Ex quo solet molestie. Pertinax hendrerit contentiones ei mea. Eu solet dolorem apeirian his.\
      \
      Quo te legere dicunt, qui ad nemore singulis, nam nibh audiam an. Mel ex eius consul. Purto inimicus signiferumque sed et. Ex cum gloriatur assueverit, pri soleat delectus theophrastus id. An doctus scripta mei, melius accusata deseruisse per eu. Sit platonem rationibus eu.Lorem ipsum dolor sit amet, nam legere aliquip oportere ea, mea at solet utinam laoreet. Abhorreant eloquentiam per no, vim ipsum ponderum at. Sea cibo dicat sapientem ut, doctus volutpat ius cu. Facete saperet partiendo et usu. Sea suscipiantur necessitatibus in.\
      \
      Ei per porro harum, expetenda cotidieque has at. Error omnes sea an, in nec erat iracundia, eligendi efficiendi pri et. Nam mutat consequat in, sed diam luptatum ad. Id usu novum sonet argumentum. Forensibus quaerendum eam no, erat prima ea mel, id habeo essent graecis nam.",
      "participants" : ["Aragorn", "Legolas", "Gimli"],
      "mimetype" : "image/png",
      "media" : "http://lorempixel.com/1080/720/"
    },
    {
      "title" : "Calcul d'intégrale",
      "text" : "Lorem intégrale dolor sit amet, sed probo adolescens te. Nec ea solet percipitur. Velit quando commodo sed ut, paulo soluta quaerendum vix ut, id aliquip constituam pri. Ex quo solet molestie. Pertinax hendrerit contentiones ei mea. Eu solet dolorem apeirian his.\
      \
      Quo te legere dicunt, qui ad nemore singulis, nam nibh audiam an. Mel ex eius consul. Purto inimicus signiferumque sed et. Ex cum gloriatur assueverit, pri soleat delectus theophrastus id. An doctus scripta mei, melius accusata deseruisse per eu. Sit platonem rationibus eu.Lorem ipsum dolor sit amet, nam legere aliquip oportere ea, mea at solet utinam laoreet. Abhorreant eloquentiam per no, vim ipsum ponderum at. Sea cibo dicat sapientem ut, doctus volutpat ius cu. Facete saperet partiendo et usu. Sea suscipiantur necessitatibus in.\
      \
      Ei per porro harum, expetenda cotidieque has at. Error omnes sea an, in nec erat iracundia, eligendi efficiendi pri et. Nam mutat consequat in, sed diam luptatum ad. Id usu novum sonet argumentum. Forensibus quaerendum eam no, erat prima ea mel, id habeo essent graecis nam.",
      "participants" : ["Un Matheux", "Un autre Matheux", "Encore un autre Matheux"]
    }
  ];

  constructor() { }

  ngOnInit() {
  }

}
