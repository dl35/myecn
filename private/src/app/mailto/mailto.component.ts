import { MatSnackBar, MatDrawer } from '@angular/material';
import { MediaMatcher } from '@angular/cdk/layout';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-mailto',
  templateUrl: './mailto.component.html',
  styleUrls: ['./mailto.component.scss']
})
export class MailtoComponent implements OnInit {

  @ViewChild('mdrawer') mdrawer: MatDrawer;

  // showFiller = false;
  // hideSide = true;
  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;

  quilltoobar= {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'], ['link'], [{ 'align': [] }], [{ 'list': 'ordered'}, { 'list': 'bullet' }]
    ]
  };

  constructor( changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher, private snackBar: MatSnackBar  ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    console.log('create');
}

  ngOnInit() {
  }

  switchdrawer() {

    this.mdrawer.opened ? this.mdrawer.close() : this.mdrawer.open() ;

  }
}
