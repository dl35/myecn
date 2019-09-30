import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { LicenciesService } from './services/licencies.service';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MyDataSource } from './MyDataSource';
import { IDataLicencies } from './models/data-licencies';
import { DialogConfirmComponent } from '../dialog-confirm/dialog-confirm.component';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { TexteRoutesService } from '../services/texte-routes.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-licencies',
  templateUrl: './licencies.component.html',
  styleUrls: ['./licencies.component.scss']
})

export class LicenciesComponent implements OnInit  {

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  small  = false;
  item: any ;

  fvalue = '' ;


  public myfilter = {entr: undefined, sexe: undefined, officiel: undefined, categorie: undefined, type: undefined, valide: undefined,
  paye: undefined, auto_parentale: undefined, cert_medical: undefined, fiche_medicale: undefined , inscription: '1' };

  public dataSource: MyDataSource = null;
  public displayedAllColumns: string[] = ['nom', 'prenom', 'categorie' , 'rang' , 'type'  , 'entr', 'sexe',
  'officiel' , 'c.medical' , 'a.parentale' , 'f.medical' , 'cotisation' , 'total' , 'valide' , 'paye' , 'id' ];
  public displayedSmallColumns: string[] = ['nom', 'prenom', 'valide' ,  'id' ];
  public displayedColumns: string[] = this.displayedAllColumns ;

  constructor( private route: Router , private lserv: LicenciesService , private dialog: MatDialog,  private textRoute: TexteRoutesService ,
               private breakpointObserver: BreakpointObserver ) {

   // this.mobileQuery = media.matchMedia('(max-width: 600px)');

                  this.textRoute.sendMessage('Licencies');


    const layoutChanges = breakpointObserver.observe([
      Breakpoints.XSmall, Breakpoints.Small
      ]);

    layoutChanges.subscribe(result => {
      if ( result.matches ) {
        this.displayedColumns = this.displayedSmallColumns ;
        this.small = true ;
      } else {
        this.displayedColumns = this.displayedAllColumns ;
        this.small = false ;
      }


    });


   }




  ngOnInit() {
    this.lserv.getdatas().subscribe(
      (datas) =>  {   this.setDataSource( datas ) ; }
    );

  }

refresh() {
  this.lserv.name = '' ;
  this.lserv.getdatas().subscribe(
    (datas) =>  {   this.setDataSource( datas ) ; }
  );

}

private setDataSource( datas: IDataLicencies[] ) {
  this.dataSource = new MyDataSource( datas) ;
  this.dataSource.paginator = this.paginator;
  this.dataSource.sort = this.sort;
  this.dataSource.allfilter = this.myfilter;

    if ( this.lserv.name ) {
      const n = this.lserv.name ;
      this.lserv.name = '';
      this.applyFilter( n );

    }


}

tostats() {
  window.open('/api/public/scripts/stats.php' , '_blank' );
}

tocsv() {
  window.open('/api/public/scripts/csv.php' , '_blank' );
}

 toFilter() {
  if (!this.dataSource) { return; }
  this.dataSource.allfilter = this.myfilter;
        }



applyFilter(filterValue: string) {
  this.fvalue = filterValue ;
  this.dataSource.filter = filterValue.trim().toLowerCase();
}

editForm(row) {
  this.lserv.item = row ;
  this.route.navigate(['/licencies/edit']);

}


deleteItem( item ) {
  const dialogRef = this.dialog.open(DialogConfirmComponent, {
    width: '50%',
    data: { id: item.id , info: 'Voulez vous supprimer ' + item.prenom + ' ' + item.nom + ' ?'  },
    disableClose: true
   });

   dialogRef.beforeClosed().subscribe(
     (result) => {
               if (result) {
                this.lserv.delete( item.id ).subscribe(
                    () => { this.removeItem( item.id ) ; }

                ); }},
     () => { },
     () => {},
   );

}



private removeItem( id ) {
  const d = [...this.dataSource.datas]  ;
  this.dataSource.datas =  d.filter( item => item.id !== id);
}




}







