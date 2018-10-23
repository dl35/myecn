import { CompetitionsModule } from './competitions/competitions.module';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { AuthGuard } from './guard/guard.guard';
import { MailtoComponent } from './mailto/mailto.component';
import { CompetitionsComponent } from './competitions/competitions.component';
import { LicenciesComponent } from './licencies/licencies.component';
import { EngagementsComponent } from './engagements/engagements.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', component: LoginComponent },
  { path: '',   component: MainComponent, canActivate: [AuthGuard] , canActivateChild : [AuthGuard] , children:
[

//  { path: 'licencies', component: LicenciesComponent },
//  { path: 'engagements', component: EngagementsComponent },
//  { path: 'competitions', component: CompetitionsComponent },
//  { path: 'mailto', component: MailtoComponent  },
//  { path: 'mytest', component: MytestComponent  },
]},

  { path: '**',   component: LoginComponent   }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
