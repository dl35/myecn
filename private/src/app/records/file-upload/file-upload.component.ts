import { Component } from '@angular/core';
import { UploadService } from '../services/upload.service';
import { HttpEventType } from '@angular/common/http';


@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']

})
export class FileUploadComponent  {

  selectedFile: File = null ;
  constructor(private upService: UploadService ) {}

  onFileSelected( event ) {

    this.selectedFile = event.target.files[0] ;
console.log( this.selectedFile ) ;
  }

onUpload() {
  const formData = new FormData();
  formData.append('file', this.selectedFile , this.selectedFile.name );
  console.log( formData ) ;


    this.upService.upload( formData ).subscribe(
        (event) => { if ( event.type === HttpEventType.UploadProgress  ) {

            console.log( 'progress ' + Math.round( event.loaded / event.total ) * 100  ) ;
        } else if ( event.type === HttpEventType.Response )  {
          console.log( event ) ;

         }

      } ,

      ( err) => { }  ,


    );

}


}
