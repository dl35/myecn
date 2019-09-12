import { LoginService } from './services/login.service';
import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  isLoggin = false;
  constructor(private lservice: LoginService,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer) {
    this.matIconRegistry.addSvgIcon(
      'swimvalid',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/images/swimok.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'swiminvalid',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/images/swimko.svg')
    );

  }

  ngOnInit() {

    this.isLoggin = this.lservice.checkCredentials();

  }


}
