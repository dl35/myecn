import { Component, OnInit, Input, HostListener, ElementRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { UploadService } from '../services/upload.service';
import { HttpEventType } from '@angular/common/http';


@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: FileUploadComponent,
      multi: true
    }
  ]
})
export class FileUploadComponent  {

  selectedFile: File = null ;
  constructor(private upService: UploadService ) {}

  onFileSelected( event ) {

    this.selectedFile = event.target.files[0] ;

  }

onUpload() {
  const formData: FormData = new FormData();
  formData.append('file', this.selectedFile );

    this.upService.upload( formData ).subscribe(
        (event) => { if ( event.type === HttpEventType.UploadProgress  ) {

            console.log( 'progress ' + Math.round( event.loaded / event.total ) * 100  ) ;
        } else if ( event.type === HttpEventType.Response )  {
          console.log( event ) ;

         }

      } ,

      ( err) => { }  ,


    ) 

}


}
