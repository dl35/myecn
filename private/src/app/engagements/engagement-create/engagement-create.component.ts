import { EngageService } from './../services/engage.service';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';
import { stringify } from '@angular/core/src/render3/util';

@Component({
  selector: 'app-engagement-create',
  templateUrl: './engagement-create.component.html',
  styleUrls: ['./engagement-create.component.scss']
})
export class EngagementCreateComponent implements OnInit {

  public dataForm: FormGroup ;
  @Input()
  id: number ;

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

  doCreate() {
      const datas = this.dataForm.getRawValue() ;
console.log( this.id , datas );

      this.eService.createEngagement( this.id  , datas  ).subscribe(
          res => { console.log(res) ; window.alert(res.message); },
          err => { console.log(err) ; window.alert( JSON.stringify(err) );  }


      ) ;

  }



}
