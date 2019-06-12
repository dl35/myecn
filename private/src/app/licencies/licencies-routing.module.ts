import { LicenciesComponent } from './licencies.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';

const routes: Routes = [
  {   path: '', component: LicenciesComponent } ,
  {   path: 'add', component: AddComponent } ,
  {   path: 'edit', component: EditComponent }
 ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LicenciesRoutingModule { }
