import { Component, ElementRef, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'images.ng';
  @ViewChild('fileUploadViewChild', {static: false}) fileUploadViewChild?: ElementRef;

  photoId = 0;

  constructor(public http: HttpClient) { }

  async uploadPhoto(file: File) {
    console.log("upload");

    const formData = new FormData();
    formData.append('file', file, file.name);

    let res = await lastValueFrom(this.http.post<any>('http://localhost:5169/api/photos', formData));

    console.log(res);
    this.photoId = res.id;
    
  }

  async uploadPhotoViewChild() {
    let file: File = this.fileUploadViewChild?.nativeElement.files[0];
    this.uploadPhoto(file);
  }
}
