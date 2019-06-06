import { DialogEngageComponent } from './dialog-engage/dialog-engage.component';
import { CompetEngage, LicEngage } from './models/data-engage';
import { MediaMatcher, BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { EngageService } from './services/engage.service';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-engagements',
  templateUrl: './engagements.component.html',
  styleUrls: ['./engagements.component.scss']
})
export class EngagementsComponent implements OnInit, OnDestroy {

 




  filtre = { notif: null, ext: null, pre: null };
  isCreated = false;

  notif = [
    {value: null, viewValue: '-'},
    {value: '1', viewValue: 'notifié'},
    {value: '0', viewValue: 'non notifié'}
  ];
  ext = [
    {value: null, viewValue: '-'},
    {value: '1', viewValue: 'Fait'},
    {value: '0', viewValue: 'à Faire'}
  ];

  pre = [
    {value: null, viewValue: '-'},
    {value: 'oui' , viewValue: 'Oui'},
    {value: 'non', viewValue: 'Non'},
    {value: 'at', viewValue: 'At'}
  ];



  datas$: Observable<CompetEngage[]> ;
  engage$: Observable<LicEngage[]> ;


  dataForm = new FormControl();

  idc: number;


  destroyed$: Subject<any> = new Subject();


  engageList$: Observable<LicEngage[]>;
  ​layoutChanges: Observable<BreakpointState>;
constructor(public breakpointObserver: BreakpointObserver, public dialog: MatDialog, private eService: EngageService) {

  this.idc = -1;

  this.layoutChanges = this.breakpointObserver.observe([
    Breakpoints.Medium,
    Breakpoints.Large,
    Breakpoints.XLarge,
  ]);


}


  ngOnInit() {
    this.eService.getCompet();
    this.datas$ =  this.eService.getObsCompet() ;
  }

  public setCreated(response) {
    if (response.success) {
      this.setCompetition(this.idc);

    } else { /* this.showSnackBar(response.message, false); */ }

  }

  public initFiltre() {
    if ( this.filtre.ext !== null ) { this.filtre.ext = null; }
    if ( this.filtre.notif !== null ) { this.filtre.notif = null; }
    if ( this.filtre.pre !== null ) { this.filtre.pre = null; }
  }


  public delAll() {
    const dialogRef = this.dialog.open(DialogEngageComponent, {
      width: '60%',
      data: { id: this.idc, addLic: false, info: 'Supprimer tous les nageurs non notifiés ?' },
      disableClose: true
    });


    dialogRef.beforeClosed().subscribe(
      (result) => {
        if (result) {
          this.eService.setDeleteAll(this.idc);
        }
      },
      () => { },
      () => { } ,
    );



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
          this.eService.setDelete(id);
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
          this.eService.setExtranat(this.idc, id);
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
           this.eService.setNotification(this.idc, id);
        }
      },
      () => { },
      () => { } ,
    );
  }


  public setCompetition(id) {
    this.idc = id;
    this.eService.getEngagement(id) ;
    this.engage$ = this.eService.getObservable();

      this.engage$.subscribe(
        (res) => ( res.length > 0 ) ? this.isCreated = true : this.isCreated = false
      );

  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
 //   this.mobileQuery.removeListener(this._mobileQueryListener);
  }


myfilter( e  ) {
  let res = false;
  e.forEach( c => {
     if ( c.presence === this.filtre.pre  ) {
          res = true ;
     }

  });
return   res  ;

}



doFilter() {


  this.engage$ = this.eService.getObservable().pipe(
   map( item =>   item.filter( d =>   ( this.filtre.notif === '0'  ) ?  (d.notification === 0 ) : (d) )),
   map( item =>   item.filter( d =>   ( this.filtre.notif === '1'  ) ?  (d.notification > 0 ) : (d) )),
   map( item =>   item.filter( d =>   ( this.filtre.ext  === null  ) ?  (d) : (  d.extranat === +this.filtre.ext  ) )),
   map( item =>   item.filter( d =>   ( this.filtre.pre === null   ) ?  (d)  :  this.myfilter(d.eng) ) ) );


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
          this.eService.sendMails(this.idc);
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
          this.setCompetition(this.idc);
        }
      },
      () => {},
      () => {}
    );
  }


}
