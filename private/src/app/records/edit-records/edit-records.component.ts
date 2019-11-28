import { RecordsService } from './../services/records.service';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IRecords } from '../models/models-records';

@Component({
  selector: 'app-edit-records',
  templateUrl: './edit-records.component.html',
  styleUrls: ['./edit-records.component.scss']
})
export class EditRecordsComponent implements OnInit {


  public types = ['CLUB', 'DEP', 'REG', 'FRA'];

  @Output() quitte = new EventEmitter<Boolean>();
  public dataForm: FormGroup;

  @Input()
  set data(data: IRecords) {

    delete data.modif;


    this.dataForm.setValue(data, { onlySelf: true });
  }

  constructor(private formBuilder: FormBuilder, private recService: RecordsService) {

    this.createForm();

  }

  ngOnInit() {
  }

  doquitte( v ) {
    this.quitte.emit(v);
  }

  saveForm() {
    const ndata = this.dataForm.getRawValue();
    ndata.ageupdate = ndata.age;
    this.recService.put(ndata).subscribe(
      () => this.doquitte(true)
    );

  }



  private createForm() {
    this.dataForm = this.formBuilder.group({
      age: [{ value: null, disabled: true }, [Validators.required]],
      nom: [{ value: null }, [Validators.required]],
      prenom: [{ value: null }, [Validators.required]],
      lieu: [''],
      bassin: ['25', [Validators.required]],
      date: [null, [Validators.required]],
      distance: ['50', [Validators.required]],
      sexe: ['F', [Validators.required]],
      type: ['CLUB', [Validators.required]],
      nage: ['NL', [Validators.required]],
      points: [0, [Validators.required, Validators.min(0)]],
      temps: [0, [Validators.required, Validators.min(0)]]
    }
    );
  }
}




