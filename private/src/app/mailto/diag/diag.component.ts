import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DialogConfirmComponent } from 'src/app/dialog-confirm/dialog-confirm.component';

@Component({
  selector: 'app-diag',
  templateUrl: './diag.component.html',
  styleUrls: ['./diag.component.scss']
})
export class DiagComponent {
  constructor() { }
}
