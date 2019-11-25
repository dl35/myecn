import { Component, OnInit } from '@angular/core';
import { UploadService } from '../services/upload.service';
import { RecordsService } from '../services/records.service';
import { Observable } from 'rxjs/internal/Observable';



@Component({
  selector: 'app-traitement',
  templateUrl: './traitement.component.html',
  styleUrls: ['./traitement.component.scss']
})
export class TraitementComponent implements OnInit {

  compet$: Observable<any[]> ;
  datas$: Observable<any[]> ;

  constructor(private upService: UploadService , private recService: RecordsService  ) {

    this.compet$ = this.recService.getCompetitions();

  }

  ngOnInit() {
  }

  traiteFile( value ) {

    this.datas$ = this.recService.traiteRecords( value );

  }

  updaterec( item, age ) {
console.log( age , item ) ;
this.recService.updateRecords(item ,age ).subscribe( 
 (v) => { const ip = item.perf ;
            ip.forEach( e => {
              if ( e.age === age ) {
                e.type = 'eqperf' ;
              }
            });

}

);


  }


}
