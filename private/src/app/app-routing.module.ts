import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', component: LoginComponent },
/* { path: '',   component: MainComponent, canActivate: [AuthGuard] , canActivateChild : [AuthGuard] , children:
[

  { path: 'licencies', component: LicenciesComponent },
  { path: 'engagements', component: EngagementsComponent },
  { path: 'competitions', component: CompetitionsComponent },
  { path: 'mailto', component: MailtoComponent  },
  { path: 'mytest', component: MytestComponent  },
]}, */

  { path: '**',   component: LoginComponent   }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
