import { DialogEngageComponent } from './dialog-engage/dialog-engage.component';
import { CompetEngage, LicEngage, MessageResponse } from './models/data-engage';
import { MediaMatcher } from '@angular/cdk/layout';
import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { Observable, Subscription, Subject, EMPTY, interval } from 'rxjs';
import { EngageService } from './services/engage.service';
import { FormControl } from '@angular/forms';
import { MatSnackBar, MatDialog } from '@angular/material';
import { ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material';
import { takeUntil, shareReplay, catchError, finalize, map, tap, take, filter } from 'rxjs/operators';


@Component({
  selector: 'app-engagements',
  templateUrl: './engagements.component.html',
  styleUrls: ['./engagements.component.scss']
})
export class EngagementsComponent implements OnInit, OnDestroy {

  @ViewChild('mdrawer') mdrawer: MatDrawer;


  loading = false;

  filtreEtat = [null, true, false];
  filtre = { notif: null, ext: null, pre: null };

  hideSide = true;
  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;
  datas: CompetEngage[];

  dataForm = new FormControl();

  idc: number;

  engage: LicEngage[];
  cachedDatas: LicEngage[];

  destroyed$: Subject<any> = new Subject();


  engageList$: Observable<LicEngage[]>;
​

  constructor(public dialog: MatDialog, changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher, private eService: EngageService, private snackBar: MatSnackBar) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);

    this.engage = null;
    this.idc = -1;
    console.log('create');
}

  switchdrawer() {

    this.mdrawer.opened ? this.mdrawer.close() : this.mdrawer.open();

  }

  ngOnInit() {
    this.eService.getCompet().pipe(takeUntil(this.destroyed$)).subscribe(
      (datas) => { this.datas = datas; }

    );
  }

  public setCreated(response) {
    if (response.success) {
      this.setCompetition(this.idc);

    } else { this.showSnackBar(response.message, false); }

  }

  public initFiltre() {
    if ( this.filtre.ext !== null ) { this.filtre.ext = null; }
    if ( this.filtre.notif !== null ) { this.filtre.notif = null; }
    if ( this.filtre.pre !== null ) { this.filtre.pre = null; }
  }


  public setDelete(id) {
    const dialogRef = this.dialog.open(DialogEngageComponent, {
      width: '60%',
      data: { id: this.idc, addLic: false, info: 'Supprimer ?' },
      disableClose: true
    });


    dialogRef.beforeClosed().subscribe(
      (result) => {
        if (result) {
          this.loading = true;
          this.eService.setDelete(id).subscribe(
            (res) => {
              this.cachedDatas = this.cachedDatas.filter(obj => obj.id !== id);
              this.initFiltre();
              if ( this.cachedDatas.length === 0  ) {
                this.engage = null;
              } else {
                this.engage = this.cachedDatas;
              }
              this.showSnackBar('Suppression valide', true);
            }
            ,
            (err) => { this.showSnackBar(err.error.message, false); },
            () => this.loading = false
          );
        }
      },
      () => { },
      () => { } ,
    );
  }
  public setExtranat(id) {
    const dialogRef = this.dialog.open(DialogEngageComponent, {
      width: '60%',
      data: { id: this.idc, addLic: false, info: 'Valider Extranat ?' },
      disableClose: true
    });


    dialogRef.beforeClosed().subscribe(
      (result) => {
        if (result) {
          this.loading = true;
          this.eService.setExtranat(this.idc, id).subscribe(
            (res) => {
              const index = this.cachedDatas.findIndex(item => item.id === id);
              const data = this.cachedDatas[index];
              data.extranat = 1 - data.extranat;
              this.showSnackBar('Extranat valide', true);
              this.doUpdate();
            }
            ,
            (err) => { this.showSnackBar(err.error.message, false); },
            () => this.loading = false
          );
        }
      },
      () => { },
      () => { } ,
    );
  }

  public setNotification(id) {
    const dialogRef = this.dialog.open(DialogEngageComponent, {
      width: '60%',
      data: { id: this.idc, addLic: false, info: 'Envoyer un Email ?' },
      disableClose: true
    });
    dialogRef.beforeClosed().subscribe(
      (result) => {
        if (result) {
          this.loading = true;
          this.eService.setNotification(this.idc, id).subscribe(
            (res) => {
              const index = this.cachedDatas.findIndex(item => item.id === id);
              const data = this.cachedDatas[index];
              data.notification = data.notification + 1;
              this.showSnackBar('Email valide', true);
            }
            ,
            (err) => { this.showSnackBar(err.error.message, false); },
            () => this.loading = false
          );
        }
      },
      () => { },
      () => { } ,
    );
  }


  public setCompetition(id) {
    this.idc = id;
    this.loading = true;
    this.eService.getEngagement(id).pipe( takeUntil(this.destroyed$)).subscribe(
      (res) => {
        if (res.length === 0) {
          this.engage = this.cachedDatas = null;
        } else {
          this.initFiltre();
          this.engage = this.cachedDatas = res; this.showSnackBar('Engagements: ' + res.length, true);
        }
      },
      (err) => { this.showSnackBar(err.error.message, false); },
      () => this.loading = false
    );
  }


  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }



  public doUpdate() {

    let tmp = this.cachedDatas;


    if (this.filtre.notif === true) {
      tmp = tmp.filter(item => item.notification !== 0);
    } else if (this.filtre.notif === false) {
      tmp = tmp.filter(item => item.notification === 0);
    }


    const mtmp = Array();
    if (this.filtre.pre === false) {
      tmp.forEach(item => {

        item.eng.forEach(e => {
          if (e.presence === 'non') { mtmp.push(item); return; }
        });

      });
      tmp = mtmp.slice();
    } else if (this.filtre.pre === true) {
      tmp.forEach(item => {

        item.eng.forEach(e => {
          if (e.presence === 'oui') { mtmp.push(item); return; }
        });

      });
      tmp = mtmp.slice();
    }


    if (this.filtre.ext === true) {
      tmp = tmp.filter(item => item.extranat === 1);
    } else if (this.filtre.ext === false) {
      tmp = tmp.filter(item => item.extranat === 0);
    }


    this.engage = tmp;

  }



  public doFilter(value) {

    if (value === 'notif') {
      this.filtre.notif = this.filtreEtat[(this.filtreEtat.indexOf(this.filtre.notif) + 1) % this.filtreEtat.length];
    } else if (value === 'ext') {
      this.filtre.ext = this.filtreEtat[(this.filtreEtat.indexOf(this.filtre.ext) + 1) % this.filtreEtat.length];
    } else {
      this.filtre.pre = this.filtreEtat[(this.filtreEtat.indexOf(this.filtre.pre) + 1) % this.filtreEtat.length];
    }

    this.doUpdate();

  }


  private showSnackBar(message, info) {
    // tslint:disable-next-line:no-shadowed-variable
    let style = 'snack-success';
    if (!info) {
      style = 'snack-error';
    }
    this.snackBar.open(message, '', {
      duration: 1500,
      announcementMessage: 'denis',
      panelClass: [style]
    });
  }

  public sendMails() {
    const dialogRef = this.dialog.open(DialogEngageComponent, {
      width: '60%',
      data: { id: this.idc, addLic: false, info: 'Envoyer les emails ?' },
      disableClose: true
    });


    dialogRef.beforeClosed().subscribe(
      (result) => {
        if (result) {
          this.loading = true;
          this.eService.sendMails(this.idc).subscribe(
            (res) => { this.showSnackBar('send mails ok', true); this.setCompetition(this.idc); },
            (err) => { this.showSnackBar(err.error.message, false); },
            () => this.loading = false

          );
        }
      },
      () => { } ,
      () => { } ,
    );
  }

  public addLic() {
    const dialogRef = this.dialog.open(DialogEngageComponent, {
      width: '80%',
      data: { id: this.idc, addLic: true, info: 'Ajouter des licencies ?' },
      disableClose: true
    });
    dialogRef.beforeClosed().subscribe(
      (result) => {
        if (result) {
          this.loading = true;
          this.showSnackBar('ajout valide', true); this.setCompetition(this.idc);
          // (error) =>  { this.showSnackBar( error   , false ); }
        }
      },
      (err) => { this.showSnackBar(err.error.message, false); },
      () => this.loading = false
    );
  }


}
