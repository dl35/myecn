import { DialogEngageComponent } from './dialog-engage/dialog-engage.component';
import { CompetEngage, LicEngage } from './models/data-engage';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { EngageService } from './services/engage.service';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { map, takeUntil } from 'rxjs/operators';



@Component({
  selector: 'app-engagements',
  templateUrl: './engagements.component.html',
  styleUrls: ['./engagements.component.scss'],
  encapsulation: ViewEncapsulation.None

})
export class EngagementsComponent implements OnInit, OnDestroy {

  isCreated = false;
  listeEngage = [];

  filtre = { notif: null, ext: null, pre: null , cat: null , sexe: null , rang: null };

  notif = [
    {value: null, viewValue: '-'},
    {value: '1', viewValue: 'Oui'},
    {value: '0', viewValue: 'Non'}
  ];
  ext = [
    {value: null, viewValue: '-'},
    {value: '1', viewValue: 'Oui'},
    {value: '0', viewValue: 'Non'}
  ];

  pre = [
    {value: null, viewValue: '-'},
    {value: 'oui' , viewValue: 'Oui'},
    {value: 'non', viewValue: 'Non'},
    {value: 'at', viewValue: 'Attente'}
  ];

  sexe = [
    {value: null, viewValue: '-'},
    {value: 'F' , viewValue: 'F'},
    {value: 'H', viewValue: 'H'},
  ];

  cat = [
    {value: null, viewValue: '-'},
    {value: 'AV' , viewValue: 'Avenirs'},
    {value: 'JE' , viewValue: 'Jeunes'},
    {value: 'JU', viewValue: 'Juniors'},
    {value: 'SE', viewValue: 'Seniors'},
    {value: 'MA', viewValue: 'Masters'},
  ];
  rang = [
    {value: null, viewValue: '-'},
    {value: '1' , viewValue: '1'},
    {value: '2', viewValue: '2'},
    {value: '3', viewValue: '3'},
    {value: 'C1', viewValue: 'c1'},
    {value: 'C2', viewValue: 'c2'},
    {value: 'C3', viewValue: 'c3'},
    {value: 'C4', viewValue: 'c4'},
    {value: 'C5', viewValue: 'c5'},
    {value: 'C6', viewValue: 'c6'},
    {value: 'C7', viewValue: 'c7'},
    {value: 'C8', viewValue: 'c8'},
    {value: 'C9', viewValue: 'c9'},
    {value: 'C10', viewValue: 'c10'},
    {value: 'C11', viewValue: 'c11'},
    {value: 'C12', viewValue: 'c12'}

  ]


datas$: Observable<CompetEngage[]> ;
engage$: Observable<LicEngage[]> ;
dataForm = new FormControl();
idc: number;
destroyed$: Subject<any> = new Subject();


​layoutChanges: Observable<BreakpointState>;
// tslint:disable-next-line: max-line-length
constructor( public breakpointObserver: BreakpointObserver, public dialog: MatDialog, private eService: EngageService) {

  this.idc = -1;

  this.layoutChanges = this.breakpointObserver.observe([
    Breakpoints.Medium,
    Breakpoints.Large,
    Breakpoints.XLarge,
  ]);


}


  ngOnInit() {
   this.eService.getCompet();
    this.datas$ =  this.eService.getObsCompet();
    this.engage$ = this.eService.getData();
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
    if ( this.filtre.sexe !== null ) { this.filtre.sexe = null; }
    if ( this.filtre.cat !== null ) { this.filtre.cat = null; }
    if ( this.filtre.rang !== null ) { this.filtre.rang = null; }
  }


  public delAll() {
    const dialogRef = this.dialog.open(DialogEngageComponent, {
      width: '60%',
      data: { id: this.idc, mode: 'deleteall' , info: 'Supprimer tous les nageurs non notifiés ?' },
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
      data: { id: this.idc, mode: 'delete', info: 'Supprimer ?' },
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
    this.eService.setExtranat(this.idc, id);
  }

  public setNotification(id) {
    const dialogRef = this.dialog.open(DialogEngageComponent, {
      width: '60%',
      data: { id: this.idc, mode: 'notif' , info: 'Envoyer un Email ?' },
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
    this.initFiltre();
    this.idc = id;
    this.eService.getEngagement(id) ;
    this.engage$.pipe(takeUntil(this.destroyed$)).subscribe(
        (v) => {
          this.isCreated = v.length > 0 ;
          this.listeEngage = v ;
        }

    );

  }

  ngOnDestroy(): void {
    this.destroyed$.complete();
    this.eService.clearData();
    }


myfilter( e  ) {
  let res = false;
  e.forEach( c => {
     if (  c.presence === this.filtre.pre  ) {
       res = true ;
     }
  });
return   res  ;

}

refreshFilter() {
this.initFiltre();
this.doFilter();

}

doFilter() {


  this.engage$.pipe(
   takeUntil(this.destroyed$),
   map( item =>   item.filter( d =>   ( this.filtre.notif === '0'  ) ?  (d.notification === '0' ) : (d) )),
   map( item =>   item.filter( d =>   ( this.filtre.notif === '1'  ) ?  (d.notification !== '0'  ) : (d) )),
   map( item =>   item.filter( d =>   ( this.filtre.ext  === null  ) ?  (d) : (  d.extranat === this.filtre.ext  ) )),
   map( item =>   item.filter( d =>   ( this.filtre.pre === null   ) ?  (d)  :  this.myfilter(d.eng ) ) ) ,

   map( item =>   item.filter( d =>   ( this.filtre.sexe === null   ) ?  (d)  :  (  d.sexe === this.filtre.sexe  ) ) ) ,
   map( item =>   item.filter( d =>   ( this.filtre.cat === null   ) ?  (d)  : (  d.categorie === this.filtre.cat  )) ) ,
   map( item =>   item.filter( d =>   ( this.filtre.rang === null   ) ?  (d)  : (  d.rang === this.filtre.rang  )  ) ) )

   .subscribe(
     (v) => this.listeEngage = v
   );


 }



  public sendMails() {
    const dialogRef = this.dialog.open(DialogEngageComponent, {
      width: '60%',
      data: { id: this.idc, mode: 'emails' , info: 'Envoyer les emails ?' },
      disableClose: true
    });


    dialogRef.beforeClosed().subscribe(
      (result) => {
        if (result) {
          this.eService.sendMails(this.idc) ;
              }
      },
      () => { } ,
      () => { } ,
    );
  }

  public addLic() {
    const dialogRef = this.dialog.open(DialogEngageComponent, {
      width: '80%',
      data: { id: this.idc, mode: 'add' , info: 'Ajouter des licencies ?' },
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

public forcereponse( item ) {

  if ( item.notification === '0' ) {
    return ; }
  const dialogRef = this.dialog.open(DialogEngageComponent, {
    width: '80%',
    data: { item: item , mode: 'modif' , info: '' },
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
