import { NiveauService } from './service/niveau.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NDataSource } from './NDataSource';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Iniveau } from './service/Iniveau';

@Component({
  selector: 'app-niveau',
  templateUrl: './niveau.component.html',
  styleUrls: ['./niveau.component.scss']
})


export class NiveauComponent implements OnInit {

  public edited = false;
  public item: any;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  public dataSource: NDataSource = null;
  public myfilter = { categorie: undefined, niveau: undefined };
  public displayedColumns: string[] = ['nom', 'prenom', 'categorie', 'rang', 'niveau', 'id'];
  constructor(private lniveau: NiveauService) { }

  ngOnInit() {
    this.lniveau.get().subscribe(
      (datas) => { this.setDataSource(datas); }
    );
  }

  private setDataSource(datas: Iniveau[]) {
    this.dataSource = new NDataSource(datas);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  private toFilter() {
    if (!this.dataSource) { return; }
    this.dataSource.allfilter = this.myfilter;
  }


  editForm(row) {
    this.edited = true;
    this.item = row;
  }


  setHide( $event ) {
    if ( $event !== null  ) {
        const cached =  this.dataSource.datas ;
        const index =  cached.findIndex(item => item.id === $event.id);
        cached[index] = $event;
        this.dataSource.datas = cached ;
    }
    this.edited = false;

  }


}
