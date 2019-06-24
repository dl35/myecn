import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class LoginService {

    constructor(private http: HttpClient) {
    }

    signup( value: any ) {
      return this.http.post('/api/private/signup' , value) ;
    }

    signout() {
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('profile');
    }

   checkCredentials() {
    if (sessionStorage.getItem('token') === null) {
      return false;
    } else {
      return true;
    }

  }

}
