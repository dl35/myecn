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





@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    MaterialModule,
    FlexLayoutModule,
    ScrollingModule,
    FormsModule,
    ReactiveFormsModule

  ],
  declarations: [AdminComponent, UsersComponent, EditComponent]
})
export class AdminModule { }
