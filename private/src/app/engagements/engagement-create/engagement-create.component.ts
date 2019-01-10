import { EngageService } from './../services/engage.service';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { MessageResponse } from 'src/app/competitions/models/message-response';

@Component({
  selector: 'app-engagement-create',
  templateUrl: './engagement-create.component.html',
  styleUrls: ['./engagement-create.component.scss']
})
export class EngagementCreateComponent implements OnInit {

  public dataForm: FormGroup ;
  @Input()
  id: number ;

  @Output()
  created: EventEmitter<MessageResponse> = new EventEmitter();

  constructor(private formBuilder: FormBuilder ,
              private eService: EngageService ) { }


  ngOnInit() {
    this.createForm();
  }


  private createForm() {
    // Validators.pattern('^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$') ,
    this.dataForm = this.formBuilder.group({
      av: new FormControl(false),
      ju: new FormControl(false),
      je: new FormControl(false),
      se: new FormControl(false),
      ma: new FormControl(false),
      dep: new FormControl(false),
      reg: new FormControl(false),
      nat: new FormControl(false),
    } ,
     {validator: this.catValidator  }
  );

  }

   ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
 private  catValidator(input: FormControl ): any {
  if ( input.get('av').value  || input.get('je').value   ||
       input.get('ju').value  || input.get('se').value   ||
       input.get('ma').value  || input.get('dep').value  ||
       input.get('reg').value || input.get('nat').value
       ) {
    return null;
  } else {
    return { catError: true } ;
  }
}

private  doCreate() {
      const datas = this.dataForm.getRawValue() ;



      this.eService.createEngagement( this.id  , datas  ).subscribe(
          res => { this.created.emit( res );  },
          err => { console.log( err ) ; this.created.emit( err.error) ; }


      ) ;

  }



}
