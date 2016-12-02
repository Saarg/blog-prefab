import { Subscription } from 'rxjs';
import { Component, OnInit, ChangeDetectorRef, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { MediaService } from './../../services/media.service';

@Component({
  selector: 'media-form',
  outputs: ['newMediaEvent'],
  templateUrl: './media-form.component.html',
  styleUrls: ['./media-form.component.css'],
  providers: [MediaService]
})
export class MediaFormComponent implements OnInit {

  public token = null;

  public file_srcs: string[] = [];
  public newMediaEvent: EventEmitter<Object> = new EventEmitter<Object>();

  private subscription: Subscription;

  public curId = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private changeDetectorRef: ChangeDetectorRef,
    private mediaService: MediaService
  ) { }

  ngOnInit() {
    this.token = localStorage ? localStorage.getItem('AuthToken') : null;

    this.subscription = this.route.params.subscribe((param: any) => {
      this.curId = param['id'];
    });
  }

  fileChange(input){
    this.readFiles(input.files);
  }

  readFile(file, reader, callback){
    // Set a callback funtion to fire after the file is fully loaded
    reader.onload = () => {
      // callback with the results
      callback(reader.result);
    }

    // Read the file
    reader.readAsDataURL(file);
  }

  readFiles(files, index=0){
    // Create the file reader
    let reader = new FileReader();

    // If there is a file
    if (index in files) {
      // Start reading this file
      this.readFile(files[index], reader, (result) =>{
        // After the callback fires do:
        this.file_srcs.push(result);
        this.readFiles(files, index+1);// Read the next file;
      });
    }else{
      // When all files are done This forces a change detection
      this.changeDetectorRef.detectChanges();
    }
  }

  removeFile(index){
    console.log(this.file_srcs);
    this.file_srcs.splice(index, 1);
  }

  submitMedias() {
    this.file_srcs.forEach((file_src) => {
      this.mediaService.addMedia({media: file_src}, this.curId).then(res => {
        if(!res) { return }
        this.file_srcs.splice(this.file_srcs.indexOf(file_src), 1);
        if(res.success) {
          this.newMediaEvent.next(res.media);
        } else {
          // TODO display error
          console.error(res.message);
        }
      });
    });
  }
}
