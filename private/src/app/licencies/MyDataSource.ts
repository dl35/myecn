import { DataSource } from '@angular/cdk/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Observable, BehaviorSubject, Subject, merge, combineLatest, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { CollectionViewer } from '@angular/cdk/collections';
import { IDataLicencies } from './models/data-licencies';

export class MyDataSource extends DataSource<any> {


    private readonly _filterChange = new BehaviorSubject<string>('');
    get filter(): string { return this._filterChange.value; }
    set filter(filter: string) { this._filterChange.next(filter); }


    private readonly _datasChange = new BehaviorSubject<IDataLicencies[]>([]);
    get datas(): IDataLicencies[] { return this._datasChange.value; }
    set datas(data: IDataLicencies[] ) { this._datasChange.next(data); }


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


    constructor( datas: any[] ) {
        super();
        this.datas = datas ;
    }


    connect(collectionViewer: CollectionViewer): Observable<any[]> {
        const displayDataChanges = [
           this._datasChange,
           this.paginator.page,
           this._sort.sortChange,
           this._filterChange,
           this._allFilterChange
        ];


        return merge(...displayDataChanges)
          .pipe(map(() => {

           let datafilter = this.getSearchAllFilter( [...this.datas] );
           datafilter = this.getSearchString( datafilter );
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
                case 'prenom': [propertyA, propertyB] = [a.prenom, b.prenom]; break;
                case 'ville': [propertyA, propertyB] = [a.ville, b.ville]; break;
            }
            const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
            const valueB = isNaN(+propertyB) ? propertyB : +propertyB;
            return (valueA < valueB ? -1 : 1) * (this.sort.direction === 'asc' ? 1 : -1);
        });
    }




    private getSearchString(datas) {
     if ( this.filter.length ===  0) {
         return datas ;
     }

        const datafilter = datas.slice().filter((item: any) => {
            const searchStr = (item.nom + ' ' + item.prenom + ' ' + item.ville).toLowerCase();
            return searchStr.indexOf(this.filter.toLowerCase()) !== -1;
        });

        return datafilter;
    }


    private isSearchAllFilter() {

       return (  !this.allfilter.officiel && !this.allfilter.sexe &&
                 !this.allfilter.valide && !this.allfilter.categorie && !this.allfilter.type &&
                 !this.allfilter.paye && !this.allfilter.cert_medical &&
                 !this.allfilter.fiche_medicale && !this.allfilter.auto_parentale )  ;

    }

    private getSearchAllFilter(datas) {

        if ( this.isSearchAllFilter() ) {
             return datas;
        }

        const datafilter = datas.slice().filter((item: any) => {
            let flag = false;
            if ( !this.allfilter.officiel ) {
                flag = true;
            } else {
                if (item.officiel === this.allfilter.officiel) {
                    flag = true;
                } else { flag = false; }
            }


            if ( !this.allfilter.sexe  ) {
                flag = flag && true;
            } else {
                if (item.sexe === this.allfilter.sexe) {
                    flag = flag && true;
                } else { flag = false; }
            }

            if ( !this.allfilter.valide  ) {
                flag = flag && true;
            } else {
                const v =  ( this.allfilter.valide === 'true' );
                if (item.valide === v ) {
                    flag = flag && true;
                } else { flag = false; }
            }

            if ( !this.allfilter.categorie  ) {
                flag = flag && true;
            } else {
                if (item.categorie === this.allfilter.categorie  ) {
                    flag = flag && true;
                } else { flag = false; }
            }

            if ( !this.allfilter.type  ) {
                flag = flag && true;
            } else {
                if (item.type === this.allfilter.type) {
                    flag = flag && true;
                } else { flag = false; }
            }

            if ( !this.allfilter.paye  ) {
                flag = flag && true;
            } else {
                const v =  ( this.allfilter.paye === 'true' );
                if (item.paye === v ) {
                    flag = flag && true;
                } else { flag = false; }
            }

            if ( !this.allfilter.auto_parentale  ) {
                flag = flag && true;
            } else {
                const v =  ( this.allfilter.auto_parentale === 'true' );
                console.log(v);
                if (item.auto_parentale === v ) {
                    flag = flag && true;
                } else { flag = false; }
            }

            if ( !this.allfilter.cert_medical  ) {
                flag = flag && true;
            } else {
                const v =  ( this.allfilter.cert_medical === 'true' );
                if (item.cert_medical === v ) {
                    flag = flag && true;
                } else { flag = false; }
            }

            if ( !this.allfilter.fiche_medicale  ) {
                flag = flag && true;
            } else {
                const v =  ( this.allfilter.fiche_medicale === 'true' );
                if (item.fiche_medicale === v ) {
                    flag = flag && true;
                } else { flag = false; }
            }


            return flag;
        });



        return datafilter;
    }



    disconnect(): void { }


}
