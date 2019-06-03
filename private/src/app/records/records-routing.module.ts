import { EditRecordsComponent } from './edit-records/edit-records.component';
import { RecordsComponent } from './records.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '' , component: RecordsComponent },
  { path: 'edit', component: EditRecordsComponent }

    ];

@NgModule({
  imports: [RouterModule.forChild(routes)] ,
  exports: [RouterModule]
})
export class RecordsRoutingModule { }
