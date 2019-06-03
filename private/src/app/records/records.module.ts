import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from './../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecordsComponent } from './records.component';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { EditRecordsComponent } from './edit-records/edit-records.component';
import { RecordsRoutingModule } from './records-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    FlexLayoutModule,
    RecordsRoutingModule
  ],
  declarations: [RecordsComponent, FileUploadComponent, EditRecordsComponent]
})
export class RecordsModule { }
