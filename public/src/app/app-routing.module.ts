
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StatsComponent } from './stats/stats.component';
import { EngagementsComponent } from './engagements/engagements.component';
import { PiscinesComponent } from './piscines/piscines.component';
import { MenuComponent } from './menu/menu.component';
import { AdhesionComponent } from './adhesion/adhesion.component';
import { RecordsComponent } from './records/records.component';
import { CompetitionsComponent } from './competitions/competitions.component';
import { AppComponent } from './app.component';

export const routes: Routes = [
  { path: 'adhesion',   pathMatch: 'full' , component: AdhesionComponent },
  { path: 'adhesion/:id', component: AdhesionComponent },
  { path: 'engagements/:ide/:idl', component: EngagementsComponent },
  {
    path: '', component: MenuComponent,  children:
      [
        { path: 'stats',  component: StatsComponent },
        { path: 'piscines',  component: PiscinesComponent },
        { path: 'competitions',  component: CompetitionsComponent },
        { path: 'records',  component: RecordsComponent }
      ] ,
  },
  { path: '**', redirectTo: '/', pathMatch: 'full' } ,

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
