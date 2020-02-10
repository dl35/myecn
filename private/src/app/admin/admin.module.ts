import { ScrollingModule } from '@angular/cdk/scrolling';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from './../material/material.module';
import { AdminRoutingModule } from './admin-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { UsersComponent } from './users/users.component';
import { EditComponent } from './users/edit/edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ParamsComponent } from './params/params.component';


import { Routes, RouterModule } from '@angular/router';
import { RappelComponent } from './rappel/rappel.component';
import { NouveauComponent } from './nouveau/nouveau.component';
import { AncienComponent } from './ancien/ancien.component';
import { QuillModule } from 'ngx-quill';
import { UploadComponent } from './upload/upload.component';


const routes: Routes = [
  {
    path: 'params',
    component: ParamsComponent
  },
  {
    path: 'rappel',
    component: RappelComponent
  },
  {
    path: 'ancien',
    component: AncienComponent
  },
  {
    path: 'nouveau',
    component: NouveauComponent
  },
  {
    path: 'upload',
    component: UploadComponent
  },
  {
    path: 'upload/:id',
    component: UploadComponent
  },
];


@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    MaterialModule,
    FlexLayoutModule,
    ScrollingModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    QuillModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule],
  // tslint:disable-next-line: max-line-length
  declarations: [AdminComponent, UsersComponent, EditComponent, ParamsComponent, RappelComponent, NouveauComponent, AncienComponent, UploadComponent]
})
export class AdminModule { }
