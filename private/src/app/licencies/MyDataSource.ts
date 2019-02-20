import { DataSource } from '@angular/cdk/table';
import { MatSort, MatPaginator } from '@angular/material';
import { Observable, BehaviorSubject, Subject, merge } from 'rxjs';
import { map } from 'rxjs/operators';

export class MyDataSource extends DataSource<any> {

    /** Stream emitting render data to the table (depends on ordered data changes). */
    private readonly _renderData = new BehaviorSubject<[]>([]);

    /** Stream that emits when a new filter string is set on the data source. */
    private readonly _filter = new BehaviorSubject<string>('');

    /** Used to react to internal changes of the paginator that are made by the data source itself. */
    private readonly _internalPageChanges = new Subject<void>();


    get filter(): string { return this._filter.value; }
    set filter(filter: string) { this._filter.next(filter); }

    private readonly _dataChange: BehaviorSubject<[]>;
    get data() { return this._dataChange.value; }
    set data(data: []) { this._dataChange.next(data); }

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



    constructor() {
        super();
      //  this._data = new BehaviorSubject<[]>(initialData);
     //   this._updateChangeSubscription();
    }

    _updateChangeSubscription() {



    }




    connect(): Observable<any[]> {
        const displayDataChanges = [
            this._dataChange,
            this._sort.sortChange,
            //    this._filterChange,
            this._allFilterChange,
            this._paginator.page
        ];

        return merge(...displayDataChanges).pipe(
            map((e) => {

                return this.data.slice();
            }));
    }

    private getSortedData(datas): Element[] {
        if (!this._sort.active || this._sort.direction === '') { return datas; }

        return datas.sort((a, b) => {
            let propertyA: number | string = '';
            let propertyB: number | string = '';
            switch (this._sort.active) {
                case 'id': [propertyA, propertyB] = [a.id, b.id]; break;
                case 'nom': [propertyA, propertyB] = [a.nom, b.nom]; break;
                case 'prenom': [propertyA, propertyB] = [a.prenom, b.prenom]; break;
                case 'date': [propertyA, propertyB] = [a.date, b.date]; break;
                // case 'progress': [propertyA, propertyB] = [a.progress, b.progress]; break;
                // case 'color': [propertyA, propertyB] = [a.color, b.color]; break;
            }
            const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
            const valueB = isNaN(+propertyB) ? propertyB : +propertyB;
            return (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1);
        });
    }




    private getSearchString(datas) {
        const datafilter = datas.slice().filter((item: any) => {
            const searchStr = (item.nom + ' ' + item.prenom + ' ' + item.ville).toLowerCase();
            return searchStr.indexOf(this.filter.toLowerCase()) !== -1;
        });

        return datafilter;
    }


    private getSearchAllFilter(datas) {
        const datafilter = datas.slice().filter((item: any) => {
            let flag = false;
            if (!this.allfilter) {
                return true;
            }

            if (this.allfilter.sexe === '') {
                flag = true;
            } else {
                if (item.sexe === this.allfilter.sexe) {
                    flag = true;
                } else { flag = false; }
            }

            if (this.allfilter.categorie === '') {
                flag = flag && true;
            } else {
                if (item.categorie === this.allfilter.categorie.toLowerCase()) {
                    flag = flag && true;
                } else { flag = false; }
            }

            if (this.allfilter.type === '') {
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
