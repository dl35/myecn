import { AppComponent } from './app.component';
import { CompetitionsModule } from './competitions/competitions.module';
import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { LoginComponent } from './login/login.component';

import { AuthGuard } from './guard/guard.guard';
import { MailtoComponent } from './mailto/mailto.component';
import { CompetitionsComponent } from './competitions/competitions.component';
import { LicenciesComponent } from './licencies/licencies.component';
import { EngagementsComponent } from './engagements/engagements.component';
import { PiscinesComponent } from './piscines/piscines.component';
import { MenuComponent } from './menu/menu.component';
import { RecordsComponent } from './records/records.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },

 { path: '',   component: MenuComponent, canActivate: [AuthGuard] , canActivateChild : [AuthGuard] , children:
[
//  { path: 'licencies', component: LicenciesComponent },
  { path: '',  loadChildren: './licencies/licencies.module#LicenciesModule' },
//  { path: '',  loadChildren: './competitions/competitions.module#CompetitionsModule' },
  { path: 'competitions',  component: CompetitionsComponent },
  { path: 'engagements',  component: EngagementsComponent },
  { path: 'mailto',  component: MailtoComponent },
  { path: 'records', component: RecordsComponent  },
  { path: 'piscines', component: PiscinesComponent  },
  { path: '',  loadChildren: './admin/admin.module#AdminModule' },
]},

  { path: '**',   component: LoginComponent   }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
