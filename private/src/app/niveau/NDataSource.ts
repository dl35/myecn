import { DataSource } from '@angular/cdk/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Observable, BehaviorSubject, merge } from 'rxjs';
import { map } from 'rxjs/operators';
import { CollectionViewer } from '@angular/cdk/collections';
import { Iniveau } from './service/Iniveau';


export class NDataSource extends DataSource<any> {

    private readonly _datasChange = new BehaviorSubject<Iniveau[]>([]);
    get datas(): Iniveau[] { return this._datasChange.value; }
    set datas(data: Iniveau[] ) { this._datasChange.next(data); }


    private readonly _allFilterChange = new BehaviorSubject({});
    get allfilter(): any { return this._allFilterChange.value; }
    set allfilter(myfilter: any) { this._allFilterChange.next(myfilter); }

    get sort(): MatSort | null { return this._sort; }
    set sort(sort: MatSort | null) {
        this._sort = sort;
    }
    private _sort: MatSort | null;


    get paginator(): MatPaginator | null { return this._paginator; }
    set paginator(paginator: MatPaginator | null) {
        this._paginator = paginator;
            }
    private _paginator: MatPaginator | null;


    constructor( datas: Iniveau[] ) {
        super();
        this.datas = datas ;
    }


    connect(collectionViewer: CollectionViewer): Observable<any[]> {
        const displayDataChanges = [
           this._datasChange,
           this.paginator.page,
           this._sort.sortChange,
           this._allFilterChange
        ];

        return merge(...displayDataChanges)
          .pipe(map(() => {
           let datafilter = this.getSearchAllFilter( [...this.datas] );
           datafilter = this.getSortedData( datafilter );
           return this.setPaginator( datafilter );
          }));

      }

      private setPaginator(datafilter) {

        this.paginator.length = datafilter.length;

     if (this.paginator.pageIndex * this.paginator.pageSize >  this.paginator.length ) {
           this.paginator.pageIndex = 0; }

        const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
        return datafilter.splice(startIndex, this.paginator.pageSize);

    }

    private getSortedData(datas): Element[] {
        if (!this.sort.active || this.sort.direction === '') { return datas; }

        return datas.sort((a, b) => {
            let propertyA: number | string = '';
            let propertyB: number | string = '';
            switch (this.sort.active) {
                case 'nom': [propertyA, propertyB] = [a.nom, b.nom]; break;
            }
            const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
            const valueB = isNaN(+propertyB) ? propertyB : +propertyB;
            return (valueA < valueB ? -1 : 1) * (this.sort.direction === 'asc' ? 1 : -1);
        });
    }






    private isSearchAllFilter() {

       return (  !this.allfilter.categorie && !this.allfilter.niveau  )  ;

    }

    private getSearchAllFilter(datas) {



       if ( this.isSearchAllFilter() ) {
             return datas;
        }

        const datafilter = datas.slice().filter((item: any) => {
            let flag = false;

            if ( !this.allfilter.categorie  ) {
                flag = true;
            } else {
                if ( item.categorie === this.allfilter.categorie  ) {
                    flag =  true;
                } else { flag = false; }
            }

            if ( !this.allfilter.niveau  ) {
                flag = flag && true;
            } else {
                if ( item.niveau === this.allfilter.niveau ) {
                    flag = flag && true;
                } else { flag = false; }
            }

            return flag;
        });

        return datafilter;
    }



    disconnect(): void { }


}
