import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ILogin } from '../../models/iLogin';
import { UsersService } from '../../services/users.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogConfirmComponent } from 'src/app/dialog-confirm/dialog-confirm.component';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  // @Input() data: ILogin;
  @Output() quitte = new EventEmitter<Boolean>();

  isLinear = true;
  public userForm: FormGroup ;
  public pwdForm: FormGroup ;
  public profileForm: FormGroup ;

  private _data: ILogin ;

  public profiles =  [
    {value: 'admin', viewValue: 'Administrateur'},
    {value: 'user', viewValue: 'Utilisateur'},
    {value: 'ent', viewValue: 'Entraineur'}
  ];



  constructor(private formBuilder: FormBuilder ,  private uService: UsersService , public dialog: MatDialog ) {
    this.userForm = this.formBuilder.group({
      user: [null , [Validators.required , Validators.email] ]
    });
    this.pwdForm = this.formBuilder.group({
      passwd: [ null, [Validators.required, Validators.minLength(5) ] ]
    });
    this.profileForm = this.formBuilder.group({
      profile: [ null , Validators.required]
    });

  }


  @Input()
  set data(data: ILogin) {

      this.userForm.get('user').setValue( data.user  );
      this.pwdForm.get('passwd').setValue( data.passwd  );
      this.profileForm.get('profile').setValue( data.profile );
      this._data = data ;
  }



  ngOnInit() {

  }


  doquitte() {
    this.quitte.emit( true );
  }


  beforeSave() {

    this._data.user = this.userForm.get('user').value;
    this._data.passwd = this.pwdForm.get('passwd').value;
    this._data.profile = this.profileForm.get('profile').value;
    if ( this._data.id === '-1' ) {
      delete this._data.id ;
    }

  }

  save() {
      this.beforeSave();

    const dialogRef = this.dialog.open(DialogConfirmComponent, {
      width: '50%',
      data: {  info: 'Voulez vous sauvegarder ' + this._data.user + ' ?'  },
      disableClose: true
     });

     dialogRef.beforeClosed().subscribe(
       (result) => {
                 if (result) {
                  if ( this._data.id ) {
                    this.uService.put ( this._data );
                  } else  {
                    this.uService.post( this._data );
                  }
                    this.quitte.emit( true );
                   } },
       () => {},
       () => {},
     );

}

}