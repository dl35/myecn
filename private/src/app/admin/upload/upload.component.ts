import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpEventType } from '@angular/common/http';
import { AdminService } from '../services/admin.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {


  @ViewChild('fileInput', {static: false} )
  fileInput: ElementRef;
  idFile = null ;

  selectedFile: File = null ;

  pvalue = 0 ;
  uploadFile = false;

  id = 'modele' ;
  constructor(private adService: AdminService,private route: ActivatedRoute,private router: Router) {

    this.route.params.subscribe( params =>  { if ( params && params.id ) {
                                this.id =  params.id;  } });

  }

  ngOnInit() {
  }

  toattest() {
    window.open('/api/common/attestation.pdf' , '_blank' );
  }

  tomodele() {
    window.open('/api/common/modele.pdf' , '_blank' );
  }



  openFileBox() {
    this.pvalue = 0 ;
    this.selectedFile = null ;
    this.uploadFile = false ;
    if ( this.id === 'attestation' ) {
      this.idFile = 'attestation2.pdf' ;
    } else {
      this.idFile = 'modele2.pdf' ;
    }


    this.fileInput.nativeElement.click();
  }

  onFileSelected( event ) {
    this.selectedFile = event.target.files[0] ;
  }

  onUpload() {
    const formData: FormData = new FormData();
    formData.append('file', this.selectedFile , this.idFile );
    this.pvalue = 0 ;
    this.adService.upload( formData ).subscribe(
          (event) => {
            if ( event.type === HttpEventType.UploadProgress  ) {
            this.pvalue = Math.round( event.loaded / event.total * 100)  ;
            this.selectedFile = null ;
          } else if ( event.type === HttpEventType.Response )  {
           this.selectedFile = null ;
           this.uploadFile = true ;
           }
        } ,

        (err) => {   this.pvalue = 0 ;  this.selectedFile = null ;
          this.uploadFile = false ; }  ,
      );

   }


  public doquitte() {
    this.router.navigate(['admin']);
  }
}
