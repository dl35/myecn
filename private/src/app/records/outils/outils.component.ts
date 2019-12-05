
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { RecordsService } from '../services/records.service';
import { shareReplay } from 'rxjs/operators';

@Component({
  selector: 'app-outils',
  templateUrl: './outils.component.html',
  styleUrls: ['./outils.component.scss']
})
export class OutilsComponent implements OnInit {

  nom = '';
  oldnom = '';
  prenom = '';
  oldprenom = '';
  lieu = '';
  oldlieu = '';

  datas$: Observable<any>;
  constructor(private recService: RecordsService) {
  }




 go( mode ) {
    const d = {'replace': mode , 'value' : '' , 'oldvalue': '' };

    if ( mode === 'nom' ) {
      this.lieu = '' ; this.prenom = '' ;
      if (  this.nom.trim().length === 0 || this.oldnom.length === 0  ) {
        return ;
      }
       d.value = this.nom ;
       d.oldvalue = this.oldnom ;
      this.recService.replace( d ).subscribe() ;
    } else if ( mode === 'prenom' ) {
      this.nom = '' ; this.lieu = '' ;
      if (  this.prenom.trim().length === 0 || this.oldprenom.length === 0  ) {
        return ;
      }
       d.value = this.prenom ;
       d.oldvalue = this.oldprenom ;
      this.recService.replace( d ).subscribe() ;
    } else if ( mode === 'lieu' ) {
      this.nom = '' ; this.prenom = '' ;
      if (  this.lieu.trim().length === 0 || this.lieu.length === 0  ) {
        return ;
      }
       d.value = this.lieu ;
       d.oldvalue = this.oldlieu ;
      this.recService.replace( d ).subscribe() ;
    } else {

      return ;
    }

 }

  ngOnInit() {
    this.datas$ =  this.recService.getReplace().pipe(
      shareReplay()
    ) ;
  }

}
