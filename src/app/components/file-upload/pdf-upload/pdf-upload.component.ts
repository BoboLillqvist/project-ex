import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-pdf-upload',
  templateUrl: './pdf-upload.component.html',
  styleUrls: ['./pdf-upload.component.scss']
})
export class PdfUploadComponent implements OnInit {

  uploadedFile: File=null;
  constructor(private http: HttpClient) { }

  
  getFile(event) {
    const file: File = <File>event.target.files[0]
    this.uploadedFile=file;
  }
  ngOnInit() {
  }

}
