import { AdminComponent } from './admin.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { EditComponent } from './users/edit/edit.component';

const routes: Routes = [
  { path: '' , component: AdminComponent },
  { path: 'users', component: UsersComponent }

    ];

@NgModule({
  imports: [RouterModule.forChild(routes)] ,
  exports: [RouterModule]
})
export class AdminRoutingModule { }
