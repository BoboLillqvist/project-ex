import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.scss']
})
export class ImageUploadComponent implements OnInit {

  uploadedImage: File = null;
  maxWidth: number = 100;
  maxHeight: number = 100;
  context: CanvasRenderingContext2D;
  @ViewChild('previewcanvas') previewcanvas;

  constructor(private http: HttpClient) { }

  getFile(event) {
    const image: File = <File>event.target.files[0];
    this.uploadedImage = image;

    this.previewImage(image);
  }
  ngOnInit() {
  }
}
