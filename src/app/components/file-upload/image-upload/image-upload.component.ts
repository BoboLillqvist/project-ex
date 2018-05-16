import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

//firebase
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from 'angularfire2/storage';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators/map';


@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.scss']
})
export class ImageUploadComponent implements OnInit {

  id: string = "";
  url: string;
  uploadedImage: File = null; 
  imagepath: string = "";
  maxWidth: number = 100;
  maxHeight: number = 100;
  context: CanvasRenderingContext2D;

  //firebase
  ref: AngularFireStorageReference;
  task: AngularFireUploadTask;
  uploadProgress: Observable<number>;
  downloadURL: Observable<string>;

  @ViewChild('previewcanvas') previewcanvas;

  constructor(private http: HttpClient, private afStorage: AngularFireStorage, private router: Router) {}

  // firebase
  upload(image){
    this.id = Math.random().toString(36).substring(2);
    console.log("generated image id: " + this.id);

    if(this.router.url == "/create-company-profile"){
      this.imagepath = "company-profile-pictures/"+this.id;
      this.ref = this.afStorage.ref(this.imagepath); 
    }
    else if(this.router.url == "/create-student-profile"){
      this.imagepath = "student-profile-pictures/"+this.id;
      this.ref = this.afStorage.ref(this.imagepath);
    }

    this.task = this.ref.put(image);  //ladda upp fil till given referensplats
    //this.uploadProgress = this.task.percentageChanges();  //används för progressbar 
    this.task.downloadURL().subscribe(url => {
      this.downloadURL = this.afStorage.ref(this.imagepath).getDownloadURL();
    })
  }

  
  getImageUrl() {
    this.url = document.getElementById('uploadedPictureURL').getAttribute('src');
    console.log(this.url);
  }

  getFile(event) {
    const image: File = <File>event.target.files[0];
    this.uploadedImage = image;
    this.upload(image); //firebase
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
        const scale = Math.min((140 / imageWidth), (140 / imageHeight));
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
