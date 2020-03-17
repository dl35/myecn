import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer, HammerGestureConfig } from '@angular/platform-browser';
import { fromEvent } from 'rxjs';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer ) {
    this.matIconRegistry.addSvgIcon(
      'swimok',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/images/swimok.svg')
    );

    this.matIconRegistry.addSvgIcon(
      'mecn',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/images/ecn.svg')
    );


    }
 

}


