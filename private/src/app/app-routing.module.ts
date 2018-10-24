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
import { CompetitionsRoutingModule } from './competitions/competitions-routing.modules';
import { MenuComponent } from './menu/menu.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },

 { path: '',   component: AppComponent, canActivate: [AuthGuard] , canActivateChild : [AuthGuard] , children:
[

//  { path: 'licencies', component: LicenciesComponent },
  { path: '',  loadChildren: './licencies/licencies.module#LicenciesModule' },
//  { path: '',  loadChildren: './competitions/competitions.module#CompetitionsModule' },
{ path: '',  component: CompetitionsComponent },

  { path: '',  loadChildren: './engagements/engagements.module#EngagementsModule' },
  { path: '',  loadChildren: './mailto/mailto.module#MailtoModule' },
  //{ path: 'mailto', component: MenuComponent  },
  //{ path: 'piscines', component: PiscinesComponent  },
]},

  { path: '**',   component: LoginComponent   }

];

@NgModule({
  imports: [RouterModule.forRoot(routes,
    {
      preloadingStrategy: PreloadAllModules
    }
    
    )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
