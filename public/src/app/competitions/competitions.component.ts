import { Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CompetitionsService, ICompetitions } from './services/competitions.service';
import { Observable, combineLatest } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { FormGroup, FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-competitions',
  templateUrl: './competitions.component.html',
  styleUrls: ['./competitions.component.scss']
})
export class CompetitionsComponent implements OnInit, OnDestroy {

  datas$: Observable<ICompetitions[]>;
  filterForm$: Observable<any>;
  filteredProducts$: Observable<ICompetitions[]>;

  public dataForm: FormGroup;


  constructor(private fb: FormBuilder, public cService: CompetitionsService, private router: Router) {
  }
  ngOnInit() {
    this.createForm();
    this.datas$ = this.cService.getCompetitions();

    this.filteredProducts$ = combineLatest([this.datas$, this.filterForm$])
      .pipe(
        map(([items, test]) =>
          items.filter(item => item.next === test.chkFutures)
        ));
  }

  createForm() {
    this.dataForm = this.fb.group({
      chkFutures: [true]
    });

    this.filterForm$ = this.dataForm.valueChanges.pipe(startWith(this.dataForm.value));
  }

  edit(data) {
    // envoi data
    if (data.nb > 0) {
      this.cService.compet = data;
      this.router.navigate(['/competitions', data.id]);
    }

  }

  ngOnDestroy(): void {
  }



}
