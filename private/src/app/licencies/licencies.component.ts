import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { LicenciesService } from './services/licencies.service';
import { MatPaginator, MatSort } from '@angular/material';
import { MyDataSource } from './MyDataSource';

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

export class LicenciesComponent implements OnInit , AfterViewInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  edited = false ;
  item: any ;




  public myfilter = {sexe: undefined , officiel: undefined , categorie: undefined , type: undefined , valide: undefined };
  public dataSource: MyDataSource = null;
  public displayedColumns: string[] = ['nom', 'prenom', 'ville', 'categorie' , 'rang' , 'type'  , 'sexe',
  'officiel' , 'cotisation' , 'valide' , 'id' ];


  constructor( private lserv: LicenciesService ) { }

  ngOnInit() {
    this.lserv.getdatas().subscribe(
      (datas) =>  {   this.setDataSource( datas ) ; console.log( 'long '  , datas.length ) ; }
    );


  }

  ngAfterViewInit() {
 

  }




private setDataSource( datas ) {
  this.dataSource = new MyDataSource( datas ) ;
  this.dataSource.paginator = this.paginator;
//  this.dataSource.sort = this.sort;

}

 toFilter( $event ) {
  if (!this.dataSource) { return; }
  this.dataSource.allfilter = this.myfilter;
        }



applyFilter(filterValue: string) {
  this.dataSource.filter = filterValue.trim().toLowerCase();
}

editForm(row) {
  this.edited = true ;
  this.item = row;

}





}







