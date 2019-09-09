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


const routes: Routes = [
  {
    path: 'params',
    component: ParamsComponent
  }
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
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule],
  declarations: [AdminComponent, UsersComponent, EditComponent, ParamsComponent]
})
export class AdminModule { }
