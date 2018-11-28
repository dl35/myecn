import { EngagementsComponent } from './engagements.component';
import { NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { EngagementCreateComponent } from './engagement-create/engagement-create.component';
import { DialogEngageComponent } from './dialog-engage/dialog-engage.component';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MaterialModule
  ],
  declarations: [EngagementsComponent, EngagementCreateComponent, DialogEngageComponent]
})
export class EngagementsModule {}




