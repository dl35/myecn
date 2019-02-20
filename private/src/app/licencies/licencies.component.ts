import { Component, OnInit, ViewChild } from '@angular/core';
import { LicenciesService } from './services/licencies.service';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';

@Component({
  selector: 'app-licencies',
  templateUrl: './licencies.component.html',
  styleUrls: ['./licencies.component.scss']
})
export class LicenciesComponent implements OnInit {

  constructor(private lserv: LicenciesService ) { }
  dataSource = null;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] = ['nom', 'prenom', 'ville', 'categorie' , 'rang' , 'type'  , 'sexe',
  'officiel' , 'cotisation' , 'valide' , 'id' ];
  ngOnInit() {

this.lserv.getdatas().subscribe(
  (datas) =>  { this.setDataSource( datas ) ; }

)

  }


private setDataSource( datas ) {
  this.dataSource = new MatTableDataSource<any>(datas) ;
  this.dataSource.paginator = this.paginator;
  this.dataSource.sort = this.sort;

}

applyFilter(filterValue: string) {
  this.dataSource.filter = filterValue.trim().toLowerCase();
}

}



