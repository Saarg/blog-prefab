import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'media-form',
  templateUrl: './media-form.component.html',
  styleUrls: ['./media-form.component.css']
})
export class MediaFormComponent implements OnInit {

  public token = null;

  public file_srcs: string[] = [];

  constructor(
    private changeDetectorRef: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.token = localStorage ? localStorage.getItem('AuthToken') : null;
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
}
