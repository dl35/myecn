import { DataSource } from '@angular/cdk/table';
import { MatSort, MatPaginator } from '@angular/material';
import { Observable, BehaviorSubject, Subject, merge, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { CollectionViewer } from '@angular/cdk/collections';

export class MyDataSource extends DataSource<any> {

    /** Stream emitting render data to the table (depends on ordered data changes). */
    private readonly _renderData = new BehaviorSubject<[]>([]);


    /** Used to react to internal changes of the paginator that are made by the data source itself. */
    private readonly _internalPageChanges = new Subject<void>();

    private readonly _filterChange = new BehaviorSubject<string>('');
    _customerDatabase: any;
    get filter(): string { return this._filterChange.value; }
    set filter(filter: string) { this._filterChange.next(filter); }


    private readonly _datasChange = new BehaviorSubject<[]>([]);
    get datas(): any { return this._datasChange.value; }
    set datas(data: any ) { this._datasChange.next(data); }

    private readonly _allFilterChange = new BehaviorSubject({});
    get allfilter(): any { return this._allFilterChange.value; }
    set allfilter(myfilter: any) { this._allFilterChange.next(myfilter); }






    get sort(): MatSort | null { return this._sort; }
    set sort(sort: MatSort | null) {
        this._sort = sort;
        this._updateChangeSubscription();
    }
    private _sort: MatSort | null;


    get paginator(): MatPaginator | null { return this._paginator; }
    set paginator(paginator: MatPaginator | null) {
        this._paginator = paginator;
        this._updateChangeSubscription();
    }
    private _paginator: MatPaginator | null;



    constructor( datas ) {
        super();
        this.datas = datas ;
    }

     _updateChangeSubscription() {



    }


    connect(collectionViewer: CollectionViewer): Observable<[]> {
        const displayDataChanges = [
            this._datasChange,
            this._paginator.page,
        //    this._sort.sortChange,
        //    this._filterChange,
       //     this._allFilterChange
        ];

        let lastFilter = null;
        let lastSort = null;

        return combineLatest(...displayDataChanges).pipe(
          map(  ([newData, newFilter, newSort, newPage]) => {
            let data =  this._datasChange.value;
      
            if (newFilter !== lastFilter) {
              data = this.getFilteredData(data);
              lastFilter = newFilter ;
            }
      
            if (newSort !== lastSort) {
              data = this.getSortedData(data);
              lastSort = newSort;
            }
      
            const startIndex = this._paginator.pageIndex * this._paginator.pageSize;
            return data.splice(startIndex, this._paginator.pageSize);
       }));
      }
  



    connect(collectionViewer: CollectionViewer): Observable<[]> {
        const displayDataChanges = [
            this._datasChange,
            this._paginator.page,
        //    this._sort.sortChange,
        //    this._filterChange,
       //     this._allFilterChange
        ];
        console.log( this._paginator.page );
     //   this.paginator.length = this.datas.length;
      //  this.setPaginator( this.datas );
        return merge(...displayDataChanges)
          .pipe(map(( d ) => {

            console.log ( 'len' , d.length , this._datasChange.value.length ) ;

        //    let datafilter = this.getSearchAllFilter( d );
        //    datafilter = this.getSearchString( datafilter );
        return this.setPaginator( this.datas );
      
          }));
      }

      private setPaginator(datafilter) {


            console.log( this.paginator ) ;
      this.paginator.length = datafilter.length;

        if (this.paginator.pageIndex * this.paginator.pageSize >  this.paginator.length ) {
           this.paginator.pageIndex = 0; }

        const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
        return datafilter.splice(startIndex, this.paginator.pageSize);

    }

    private getSortedData(datas): Element[] {
        if (!this._sort.active || this._sort.direction === '') { return datas; }

        return datas.sort((a, b) => {
            let propertyA: number | string = '';
            let propertyB: number | string = '';
            switch (this._sort.active) {
                case 'nom': [propertyA, propertyB] = [a.nom, b.nom]; break;
                case 'prenom': [propertyA, propertyB] = [a.prenom, b.prenom]; break;
                case 'ville': [propertyA, propertyB] = [a.ville, b.ville]; break;
            }
            const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
            const valueB = isNaN(+propertyB) ? propertyB : +propertyB;
            return (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1);
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
             !this.allfilter.valide && !this.allfilter.categorie && !this.allfilter.type ) ;


    }

    private getSearchAllFilter(datas) {
        return datas;
        if ( this.isSearchAllFilter() ) {
            console.log( datas.length );
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
            return flag;
        });



        return datafilter;
    }



    disconnect(): void { }


}
