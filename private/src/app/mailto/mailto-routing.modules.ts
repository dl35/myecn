import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MailtoComponent } from './mailto.component';


const routes: Routes = [
    {   path: 'mailto', component: MailtoComponent }
   ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MailtoRoutingModule {}






