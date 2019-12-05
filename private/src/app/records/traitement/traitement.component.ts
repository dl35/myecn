import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { RecordsService } from '../services/records.service';
import { Observable } from 'rxjs/internal/Observable';
import { FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';



@Component({
  selector: 'app-traitement',
  templateUrl: './traitement.component.html',
  styleUrls: ['./traitement.component.scss']
})
export class TraitementComponent implements OnDestroy, OnInit {

  checked = false;
  cselect = new FormControl();
  @Input()
  compet: Observable<any[]>;

  destroy$: Subject<boolean> = new Subject<boolean>();
  datas = null;
  cached = null;

  constructor(private recService: RecordsService) {
  }

  ngOnInit() {
  }

  traiteFile(value) {
    if ( !value ) {
      this.datas = null;
      this.cached = null ;
      return;
    }
    this.recService.traiteRecords(value).pipe(takeUntil(this.destroy$))
      .subscribe(
        (v) => { this.datas = v; this.cached = Object.assign({} , v); }
      );
    this.cselect.reset();
    this.checked = false;
  }

  filter() {

    if ( !this.checked ) {
      this.datas.datas = this.cached.datas ;
      return;
    }

  this.datas.datas =  this.datas.datas.filter( function( item ) {
        let flag  = false ;
        item.perf.filter( function( iperf ) {
            if  ( iperf.type === 'perf' ||   iperf.type === 'eqperf' )  {
                flag = true;
            }
         } );
         return flag ;
    });


  }



  updaterec(item, age , rectime ) {
  if ( rectime === '-1' ) {
    this.recService.insertRecords(item, age).subscribe(
      () => {
        const ip = item.perf;
        ip.forEach(e => {
          if (e.age === age) {
            e.type = 'eqperf';
            e.rectime = e.time;
          }
        });
      }
    );

  }  else {

    this.recService.updateRecords(item, age).subscribe(
      () => {
        const ip = item.perf;
        ip.forEach(e => {
          if (e.age === age) {
            e.type = 'eqperf';
            e.rectime = e.time;
          }
        });
      }
    );

  }

  
  }



  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

}
