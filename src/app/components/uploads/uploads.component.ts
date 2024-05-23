import { environment } from './../../../environments/environment';
import { HttpClient, HttpEventType,HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit,EventEmitter, Output } from '@angular/core';
import { single } from 'rxjs';


@Component({
  selector: 'app-uploads',
  templateUrl: './uploads.component.html',
  styleUrls: ['./uploads.component.scss']
})
export class UploadsComponent implements OnInit {
  progress: number;
  message: string;
  @Output() public onUploadFinished = new EventEmitter();

  constructor(private httpClient:HttpClient) { }

  ngOnInit(): void {
  }

  uploadFile = (files) => {
    if (files.length === 0) {
      return;
    }

    let fileToUpload = <File>files[0];
    const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
    
    this.httpClient.post(environment.apiUrl+'api/upload', formData, {reportProgress: true, observe: 'events'})
      .subscribe({
        next: (event) => {
        if (event.type === HttpEventType.UploadProgress)
          this.progress = Math.round(100 * event.loaded / event.total);
        else if (event.type === HttpEventType.Response) {
          this.message = 'Yükleme Tamamlandı.';
          this.onUploadFinished.emit(event.body);
        }
      },
      error: (err: HttpErrorResponse) => console.log(err)
    });
  }
}