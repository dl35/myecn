import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { CompetitionsService, ICompetitions, IEngagements } from './services/competitions.service';
import { Subject, BehaviorSubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-competitions',
  templateUrl: './competitions.component.html',
  styleUrls: ['./competitions.component.scss']
})
export class CompetitionsComponent implements OnInit, OnDestroy {


  dataForm = new FormControl();
  datas: ICompetitions[];
  engs: IEngagements[];
  destroyed$: Subject<any> = new Subject();
  loading$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private cService: CompetitionsService ) { }

  ngOnInit() {
    this.cService.getCompetitions().pipe(takeUntil(this.destroyed$)).subscribe(
      (datas) => { this.datas = datas; },
      (error) => { console.log( error ); }
    );
  }

  private getEngagements( id ) {
      this.loading$.next(true);
      this.cService.getEngagements(id).pipe(takeUntil(this.destroyed$)).subscribe(
        (engs) => { this.engs = engs; console.log( engs );  this.setLoading(); } ,
        (error) => { console.log( error ); }
      );
  }

  private setLoading() {
    setTimeout(() => {
      this.loading$.next(false);
    }, 500);

  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
    this.loading$.unsubscribe();
  }

}
