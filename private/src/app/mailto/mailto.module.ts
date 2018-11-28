import { FlexLayoutModule } from '@angular/flex-layout';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MailtoComponent } from './mailto.component';
import { MaterialModule } from '../material/material.module';
import { QuillModule } from 'ngx-quill';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    QuillModule
  ],
  declarations: [MailtoComponent]
})
export class MailtoModule { }

