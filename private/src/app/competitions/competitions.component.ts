import { DataCompet } from './models/data-compet';
import { ChangeDetectorRef, Component, OnDestroy, OnInit, Pipe, Injectable, PipeTransform, ViewChild, ElementRef } from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';
import { CompetitionsService } from './services/competitions.service';
import { Observable , interval, Subject , fromEvent, BehaviorSubject, Subscription, EMPTY } from 'rxjs';
import { merge, map , filter , distinctUntilChanged , debounceTime, tap, catchError, finalize, shareReplay} from 'rxjs/operators';
import { FormControl } from '@angular/forms';






@Pipe({
  name: 'searchfilter'
})
@Injectable()
export class SearchFilterPipe implements PipeTransform {
  transform(items: any[], value: string): any[] {
    if (!items || !value) {
      return items;
    }
    return items.filter( e =>   (e.nom.toLowerCase() + ' ' + e.lieu.toLowerCase() ) .indexOf( value.toLowerCase() ) !== -1    );

  }

}







@Component({
  selector: 'app-competitions',
  templateUrl: './competitions.component.html',
  styleUrls: ['./competitions.component.css']
})
export class CompetitionsComponent implements OnInit , OnDestroy  {

  //searchfilter:searchText
  // @ViewChild('filter') filter: ElementRef;
  private searchControl: FormControl;
  private searchText: string ;
  private subscr: Subscription;


  private myfilter = {'verif': false , 'txt' : ''} ;



  showFiller = false;
  hideSide = true;
  mobileQuery: MediaQueryList;
  datas$: Observable<DataCompet[]> ;
  dataSelected: DataCompet;

  show = true ;

  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private compService: CompetitionsService) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);

  }

  add() {
    this.dataSelected = new DataCompet() ;
    this.show = false ;
    //this.compService.search();

  }
  edit(data) {
    this.dataSelected = data ;
    this.show = false ;
  }

  onQuitte() {
  this.show = true ;
}

doChange($event) {
 console.log( $event );
 this.myfilter.verif = $event.checked ;
 this.compService.search( this.myfilter );

}

  ngOnInit() {



    this.searchText = '';
    this.searchControl = new FormControl('');
    this.subscr =  this.searchControl.valueChanges
        .pipe(
          // tap ( () =>  console.log( this.searchText.length ) ),
          filter(   (v: string) => ( v.length < this.myfilter.txt.length ) || v.length >= 3   ),
          debounceTime( 200 ),
          distinctUntilChanged()
          ).subscribe(query => {
         // this.searchText = query ;
          this.myfilter.txt = query ;
        //  console.log( this.searchText.length  );
             this.compService.search(this.myfilter );


        });


   /* this.compService.getList().subscribe(
        (response: any) => { console.log( 'res ', response ) ; this.datas$ = response; },
        (error) => console.log(error),
        () => console.log( 'completed' )


    );*/
    this.datas$ = this.compService.getList().pipe(
      catchError(error => {
          console.error('denis' , error);
          return EMPTY;
      }),
      finalize(() => {
          console.log('Done!');

          this.datas$.pipe(
            ( map (data  => {} ) )
      }),
      shareReplay(1)
    );
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
    this.subscr.unsubscribe();
  }

}

