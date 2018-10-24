import { EngagementsComponent } from './engagements.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EngagementsRoutingModule } from './engagements-routing.module';

@NgModule({
  imports: [
    CommonModule,
    EngagementsRoutingModule
  ],
  declarations: [EngagementsComponent]
})
export class EngagementsModule { }
