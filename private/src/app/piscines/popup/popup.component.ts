import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent implements OnInit {
  private router: Router;

  @Input() data: any ;
  constructor(router: Router) { this.router = router ; }

  ngOnInit() {
  }

  route( id) {
    this.router.navigate(['/piscines/edit/' + id ]  ) ;

}

}
