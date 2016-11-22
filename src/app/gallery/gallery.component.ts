import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {

  images = [
    {
      "mimetype" : "image/png",
      "media" : "http://lorempixel.com/640/480/"
    },
    {
      "mimetype" : "image/png",
      "media" : "http://lorempixel.com/500/500/"
    },
    {
      "mimetype" : "image/png",
      "media" : "http://lorempixel.com/1080/720/"
    },
    {
      "mimetype" : "image/png",
      "media" : "http://lorempixel.com/350/200/"
    },
    {
      "mimetype" : "image/png",
      "media" : "http://lorempixel.com/300/300/"
    },
    {
      "mimetype" : "image/png",
      "media" : "http://lorempixel.com/240/120/"
    },
    {
      "mimetype" : "image/png",
      "media" : "http://lorempixel.com/666/666/"
    },
    {
      "mimetype" : "image/png",
      "media" : "http://lorempixel.com/340/340/"
    },
    {
      "mimetype" : "image/png",
      "media" : "http://lorempixel.com/350/100/"
    },
    {
      "mimetype" : "image/png",
      "media" : "http://lorempixel.com/600/300/"
    }
  ]

  constructor() { }

  ngOnInit() {
  }

}
