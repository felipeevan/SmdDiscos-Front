import { CanActivate, Router } from '@angular/router';

import { Injectable } from "@angular/core";
import { SessionService } from './services/session.service';

@Injectable()

export class AuthAdminNegate implements CanActivate {

    constructor(private session: SessionService, private router: Router) { }

    canActivate(){
      let doAdmin = this.session.isAdmin()
      if(doAdmin){
        this.router.navigate(['/dashboard']);
        return false;
      }
      return true
    }

  }