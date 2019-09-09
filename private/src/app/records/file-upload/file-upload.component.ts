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

  pvalue = 0 ;
  constructor(private upService: UploadService ) {}

torecords() {
  window.open('https://ecnatation.org/records/manage_resultats.php?admin', '_blank');

}


  onFileSelected( event ) {
    this.selectedFile = event.target.files[0] ;
  }


onUpload() {
  const formData: FormData = new FormData();
  formData.append('file', this.selectedFile , this.selectedFile.name );
  this.pvalue = 0 ;
  this.upService.upload( formData ).subscribe(
        (event) => { if ( event.type === HttpEventType.UploadProgress  ) {
          this.pvalue = Math.round( event.loaded / event.total * 100)  ;
        } else if ( event.type === HttpEventType.Response )  {
          this.pvalue = 0 ;
         }
      } ,

      (err) => { console.log('err' , err ) }  ,


    );

 }}
