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

  previewImage(image: File) {
    const canvas = this.previewcanvas.nativeElement;
    const context = canvas.getContext('2d');
    // context.clearRect(0, 0, this.maxWidth, this.maxHeight);

    const render = new FileReader();

    render.onload = function(event: any) {
      const img = new Image();

      img.onload = function() {
        // TODO: Kalla på scaleImage() istället, av nån anledning kan jag inte få ut objektet som returnas.

        // Scale image
        const imageWidth = img.width;
        const imageHeight = img.height;
        const scale = Math.min((100 / imageWidth), (100 / imageHeight));
        const imageWidthScaled = (imageWidth * scale);
        const imageHeightScaled = (imageHeight * scale);

        canvas.width = imageWidthScaled;
        canvas.height = imageHeightScaled;

        context.drawImage(img, 0, 0, imageWidthScaled, imageHeightScaled);
      };

      img.src = event.target.result;
    };

    render.readAsDataURL(image);
  }

  scaleImage(image: any, width: number, height: number) {
        const imageWidth = image.width;
        const imageHeight = image.height;

        const scale = Math.min((width / imageWidth), (height / imageHeight));

        const imageWidthScaled = (imageWidth * scale);
        const imageHeightScaled = (imageHeight * scale);

        return {
          width: imageWidthScaled,
          height: imageHeightScaled
        };
  }

  ngOnInit() {
  }
}
