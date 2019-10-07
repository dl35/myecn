import { Observable } from 'rxjs';
import { ActuService } from './services/actu.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-actualites',
  templateUrl: './actualites.component.html',
  styleUrls: ['./actualites.component.scss']
})
export class ActualitesComponent implements OnInit {

  datas$ = new Observable<any>();
  constructor(public serv: ActuService) { }

  ngOnInit() {
    this.datas$ = this.serv.get();

  }

}
