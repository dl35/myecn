import { EditComponent } from './edit/edit.component';
import { PiscinesComponent } from './piscines.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '' , component: PiscinesComponent },
  { path: 'edit/:id' , component: EditComponent },
  { path: 'add' , component: EditComponent }

    ];

@NgModule({
  imports: [RouterModule.forChild(routes)] ,
  exports: [RouterModule]
})
export class PiscinesRoutingModule { }
