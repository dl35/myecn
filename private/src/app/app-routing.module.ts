import { LogoComponent } from './logo/logo.component';
import { NiveauComponent } from './niveau/niveau.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './guard/guard.guard';
import { MailtoComponent } from './mailto/mailto.component';
import { CompetitionsComponent } from './competitions/competitions.component';
import { EngagementsComponent } from './engagements/engagements.component';
import { PiscinesComponent } from './piscines/piscines.component';
import { MenuComponent } from './menu/menu.component';
import { RecordsComponent } from './records/records.component';
import { CompetitionsEditComponent } from './competitions/competitions-edit/competitions-edit.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },

  {
    path: '', component: MenuComponent,   canActivate: [AuthGuard], canActivateChild: [AuthGuard], children:
      [

        { path: 'licencies', loadChildren: './licencies/licencies.module#LicenciesModule' },
        { path: 'niveau', component: NiveauComponent },
        { path: 'competitions', component: CompetitionsComponent } ,
        { path: 'competitions/edit', component: CompetitionsEditComponent } ,
        { path: 'engagements', component: EngagementsComponent },
        { path: 'mailto', component: MailtoComponent },
        { path: 'records', component: RecordsComponent },
        { path: 'piscines', component: PiscinesComponent },
        { path: 'admin',  loadChildren: './admin/admin.module#AdminModule' },
        { path: '', component: LogoComponent },
      ]
  },

  { path: '**', component: LoginComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
