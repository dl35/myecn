import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivateChild } from '@angular/router';
import { LoginService } from '../services/login.service';

@Injectable()
export class AuthGuard implements CanActivate , CanActivateChild {

    constructor(private router: Router , private loginservice: LoginService ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot ): boolean {

      if (sessionStorage.getItem('token') !== null && sessionStorage.getItem('profile') !== null ) {
            return true;
        }

        this.router.navigate(['login']);
        return false;
    }


    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        let profiles = ['', 'licencies', 'niveau', 'competitions', 'engagements', 'mailto', 'records', 'piscines', 'admin'];


        const profile = sessionStorage.getItem('profile') ;

        if ( profile === 'user ' ) {
            const routesToRemove = ['admin'];
            profiles = profiles.filter(item => !routesToRemove.includes(item) ) ;
        } else if ( profile === 'ent' ) {
            const routesToRemove = ['licencies', 'admin'];
            profiles = profiles.filter(item => !routesToRemove.includes(item) ) ;
        } else if ( profile === 'admin' ) {
          //  const routesToRemove = ['engagements'];
         //   profiles = profiles.filter(item => !routesToRemove.includes(item) ) ;
        } else {
            this.router.navigate(['login']);
            return false;
        }

        const path = route.routeConfig.path ;

        const value =  profiles.find(x => x === path );
     //   console.log( path , value , profiles  );

        if (  value === undefined ) {
            this.router.navigate(['login']);
            return false;

        } else {
            return this.canActivate(route , state);
        }

    }

}
