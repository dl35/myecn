import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LicenciesRoutingModule } from './licencies-routing.module';
import { LicenciesComponent } from './licencies.component';

@NgModule({
  imports: [
    CommonModule,
    LicenciesRoutingModule
  ],
  declarations: [LicenciesComponent]
})
export class LicenciesModule { }
