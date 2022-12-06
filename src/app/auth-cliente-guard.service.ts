import { CanActivate, Router } from '@angular/router';

import { Injectable } from "@angular/core";
import { SessionService } from './services/session.service';

@Injectable()

export class AuthClienteGuard implements CanActivate {

    constructor(private session: SessionService, private router: Router) { }

    canActivate() {
      let doAuth = this.session.isLogged()
      let doAdmin = this.session.isAdmin()
      if(!doAuth || doAdmin){
        this.router.navigate(['']);
      }
      return doAuth;
    }

  }