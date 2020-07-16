import { LogoComponent } from './logo/logo.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './guard/guard.guard';
import { MailtoComponent } from './mailto/mailto.component';
import { CompetitionsComponent } from './competitions/competitions.component';
import { EngagementsComponent } from './engagements/engagements.component';
import { MenuComponent } from './menu/menu.component';
import { CompetitionsEditComponent } from './competitions/competitions-edit/competitions-edit.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },

  {
    path: '', component: MenuComponent,   canActivate: [AuthGuard], canActivateChild: [AuthGuard], children:
      [

        { path: 'licencies', loadChildren: () => import('./licencies/licencies.module').then(m => m.LicenciesModule) },
        { path: 'niveau', loadChildren: () => import('./niveau/niveau.module').then(m => m.NiveauModule) },
        { path: 'competitions', component: CompetitionsComponent },
        { path: 'engagements', component: EngagementsComponent },
        { path: 'mailto', component: MailtoComponent },
        { path: 'records', loadChildren: () => import('./records/records.module').then(m => m.RecordsModule) },
        { path: 'piscines', loadChildren: () => import('./piscines/piscines.module').then(m => m.PiscinesModule) },
        { path: 'admin',  loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) },
        { path: '', component: LogoComponent },
      ]
  },

  { path: '**', component: LoginComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true ,
    preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
