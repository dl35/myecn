import { LoginService } from './services/login.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  isLoggin = false;
 constructor(private lservice: LoginService) {
  }

  ngOnInit() {

  this.isLoggin = this.lservice.checkCredentials();
    console.log( this.isLoggin ) ;


  }


}
