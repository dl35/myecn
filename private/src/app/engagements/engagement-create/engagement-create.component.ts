import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-engagement-create',
  templateUrl: './engagement-create.component.html',
  styleUrls: ['./engagement-create.component.scss']
})
export class EngagementCreateComponent implements OnInit {

  public dataForm: FormGroup ;

  constructor(private formBuilder: FormBuilder) { }




  ngOnInit() {
    this.createForm();
  }

  private createForm() {
    // Validators.pattern('^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$') ,
    this.dataForm = this.formBuilder.group({
      nom: new FormControl(false)
    }
  );

  }


}
