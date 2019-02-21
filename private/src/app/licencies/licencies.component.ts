import { Component, OnInit, ViewChild } from '@angular/core';
import { LicenciesService } from './services/licencies.service';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { MyDataSource } from './MyDataSource';
import { Validators, FormControl, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-licencies',
  templateUrl: './licencies.component.html',
  styleUrls: ['./licencies.component.scss']
})
export class LicenciesComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  edited = false ;
  item: any ;

  public myfilter = {sexe: undefined , categorie: undefined , type: undefined , valide : undefined };
  public dataSource: MyDataSource = null;
  public displayedColumns: string[] = ['nom', 'prenom', 'ville', 'categorie' , 'rang' , 'type'  , 'sexe',
  'officiel' , 'cotisation' , 'valide' , 'id' ];


  constructor(private formBuilder: FormBuilder,  private lserv: LicenciesService ) { }

  ngOnInit() {

this.lserv.getdatas().subscribe(
  (datas) =>  { this.setDataSource( datas ) ; }

);

  }


private setDataSource( datas ) {
  // this.dataSource = new MatTableDataSource<any>(datas) ;
  this.dataSource = new MyDataSource( datas ) ;
 // this.dataSource.datas = datas ;
  this.dataSource.allfilter = this.myfilter;
  this.dataSource.paginator = this.paginator;
  this.dataSource.sort = this.sort;

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
console.log( row );

  this.item = row;

}





}







