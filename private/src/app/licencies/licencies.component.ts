import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { LicenciesService } from './services/licencies.service';
import { MatPaginator, MatSort, MatDialog, MatSnackBar } from '@angular/material';
import { MyDataSource } from './MyDataSource';
import { IDataLicencies } from './models/data-licencies';
import { DialogConfirmComponent } from '../dialog-confirm/dialog-confirm.component';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-licencies',
  templateUrl: './licencies.component.html',
  styleUrls: ['./licencies.component.scss']
})
/*
export interface IFilter {
  sexe: 'F' | 'H' | undefined ;
  categorie: string ;
  type: 'R' | 'N' | undefined ;
  valide: boolean ;
}
*/

export class LicenciesComponent implements OnInit  {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  edited = false ;

  item: any ;

  fvalue = '' ;


  public myfilter = {sexe: undefined, officiel: undefined, categorie: undefined, type: undefined, valide: undefined,
  paye: undefined, auto_parentale: undefined, cert_medical: undefined, fiche_medicale: undefined };

  public dataSource: MyDataSource = null;
  public displayedAllColumns: string[] = ['nom', 'prenom', 'ville', 'categorie' , 'rang' , 'type'  , 'sexe',
  'officiel' , 'cotisation' , 'valide' , 'id' ];
  public displayedSmallColumns: string[] = ['nom', 'prenom', 'valide' , 'id' ];
  public displayedColumns: string[] = this.displayedAllColumns ;

  constructor( private lserv: LicenciesService , private dialog: MatDialog, private snackBar: MatSnackBar,
               private breakpointObserver: BreakpointObserver ) {

   // this.mobileQuery = media.matchMedia('(max-width: 600px)');

    const layoutChanges = breakpointObserver.observe([
      '(max-width: 600px)'
    ]);

    layoutChanges.subscribe(result => {
console.log( Breakpoints.Medium  ) ;

      if ( result.matches ) {
        this.displayedColumns = this.displayedSmallColumns ;
      } else {
        this.displayedColumns = this.displayedAllColumns ;
      }


    });


   }




  ngOnInit() {
    this.lserv.getdatas().subscribe(
      (datas) =>  {   this.setDataSource( datas ) ; }
    );


  }





private setDataSource( datas: IDataLicencies[] ) {
  this.dataSource = new MyDataSource( datas) ;
  this.dataSource.paginator = this.paginator;
  this.dataSource.sort = this.sort;

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
  this.edited = true ;
  this.item = row;
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
                    () => { this.removeItem( item.id ) ; this.showSnackBar('Supression valide'  , true ); },
                    (error) =>  { this.showSnackBar( error   , false ); }

                ); }},
     () => { },
     () => {},
   );

}


private showSnackBar( message , info) {
  // tslint:disable-next-line:no-shadowed-variable
  let style = 'snack-success';
  if ( !info ) {
    style = 'snack-error';
  }
  this.snackBar.open( message  , '', {
    duration: 1500,
    announcementMessage : 'denis',
    panelClass: [ style ]
  });
}




private removeItem( id ) {
  const d = [...this.dataSource.datas]  ;
  this.dataSource.datas =  d.filter( item => item.id !== id);
}


appendList( item ) {
  this.edited = false ;
  const d = [...this.dataSource.datas]  ;
  d.push( item ) ;
  this.dataSource.datas = d ;

}
updateList( item ) {
  this.edited = false ;
  const d = [...this.dataSource.datas]  ;
  const itemIndex = d.findIndex( it => it.id === item.id);
  d[itemIndex] = item ;
  this.dataSource.datas = d ;

}


}







