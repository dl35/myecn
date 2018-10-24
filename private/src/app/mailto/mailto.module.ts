import { MailtoRoutingModule } from './mailto-routing.modules';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MailtoComponent } from './mailto.component';

@NgModule({
  imports: [
    CommonModule,
    MailtoRoutingModule
  ],
  declarations: [MailtoComponent]
})
export class MailtoModule { }

