import { CanActivate, Router } from '@angular/router';

import { Injectable } from "@angular/core";
import { SessionService } from './services/session.service';

@Injectable()

export class AuthAutorize implements CanActivate {

    constructor(private session: SessionService, private router: Router) { }

    canActivate(){
      let doAuth = this.session.isLogged()
      if(doAuth){
        this.router.navigate(['/home']);
        return false;
      }
      return true
    }

  }