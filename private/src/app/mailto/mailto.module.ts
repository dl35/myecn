import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MailtoComponent } from './mailto.component';
import { MaterialModule } from '../material/material.module';
@NgModule({
  imports: [
    CommonModule,
    MaterialModule
  ],
  declarations: [MailtoComponent]
})
export class MailtoModule { }

