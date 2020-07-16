import { ActualitesComponent } from './actualites/actualites.component';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StatsComponent } from './stats/stats.component';
import { EngagementsComponent } from './engagements/engagements.component';
import { PiscinesComponent } from './piscines/piscines.component';
import { MenuComponent } from './menu/menu.component';
import { AdhesionComponent } from './adhesion/adhesion.component';
import { RecordsComponent } from './records/records.component';
import { CompetitionsComponent } from './competitions/competitions.component';
import { CompetitionsEditComponent } from './competitions/competitions-edit/competitions-edit.component';
import { LogoComponent } from './logo/logo.component';

export const routes: Routes = [

  {
    path: '', component: MenuComponent,  children:
      [
        { path: 'actualites',  component: ActualitesComponent },
        { path: 'stats',  component: StatsComponent },
        { path: 'piscines',  component: PiscinesComponent },
        { path: 'competitions',  component: CompetitionsComponent },
        { path: 'competitions/:id',  component: CompetitionsEditComponent },
        { path: 'records',  component: RecordsComponent },
        { path: '', component: LogoComponent }
      ] ,
  },
  { path: 'adhesion',  component: AdhesionComponent },
  { path: 'adhesion/:id', component: AdhesionComponent },
  { path: 'engagements/:ide/:idl', component: EngagementsComponent },
  { path: '**', redirectTo: '/', pathMatch: 'full' } ,

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
