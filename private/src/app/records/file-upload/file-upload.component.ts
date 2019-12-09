import { Observable } from 'rxjs';
import { RecordsService } from './../services/records.service';
import { Component, ViewChild, ElementRef, Input } from '@angular/core';
import { UploadService } from '../services/upload.service';
import { HttpEventType } from '@angular/common/http';
import { FormControl } from '@angular/forms';


@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']

})
export class FileUploadComponent  {

  @ViewChild('fileInput', {static: false} )
  fileInput: ElementRef;
  idFile = null ;

  cselect = new FormControl();
  @Input()
  compet: Observable<any[]> ;
  selectedFile: File = null ;

  pvalue = 0 ;
  uploadFile = false;
  constructor(private upService: UploadService , private recService: RecordsService  ) {

  }

  /*
torecords() {
  window.open('https://ecnatation.org/records/manage_resultats.php?admin', '_blank');
}*/

openFileBox(value) {
  this.pvalue = 0 ;
  this.selectedFile = null ;
  this.uploadFile = false ;

  if ( !value ) {
    return;
  }

  this.idFile = value + '.xml' ;
  this.fileInput.nativeElement.click();
}


onFileSelected( event ) {
    this.selectedFile = event.target.files[0] ;
}


onUpload() {
  const formData: FormData = new FormData();
  formData.append('file', this.selectedFile , this.idFile );
  this.pvalue = 0 ;
  this.upService.upload( formData ).subscribe(
        (event) => {
          if ( event.type === HttpEventType.UploadProgress  ) {
          this.pvalue = Math.round( event.loaded / event.total * 100)  ;
          this.selectedFile = null ;
        } else if ( event.type === HttpEventType.Response )  {
         this.selectedFile = null ;
         this.uploadFile = true ;
         this.cselect.reset();
         }
      } ,

      (err) => {   this.pvalue = 0 ;  this.selectedFile = null ;
        this.uploadFile = false ; }  ,


    );

 }}
