import { Observable, of } from 'rxjs';
import { ActuService } from './services/actu.service';
import { Component, OnInit } from '@angular/core';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-actualites',
  templateUrl: './actualites.component.html',
  styleUrls: ['./actualites.component.scss']
})
export class ActualitesComponent implements OnInit {

  
  datas$ = new Observable<any>();
  constructor(public serv: ActuService) { }

  ngOnInit() {
    this.datas$ = this.serv.getDatas();
    this.serv.get();

  }

  toNext() {
    this.serv.next();
  }

}
