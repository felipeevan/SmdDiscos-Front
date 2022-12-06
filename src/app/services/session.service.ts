import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class SessionService {

    constructor(private http: HttpClient) {}

    saveCliente(userinfo: any){
      localStorage.setItem('user', JSON.stringify(userinfo))
      localStorage.setItem('logged', 'true')
    }

    saveAdmin(userinfo: any){
      localStorage.setItem('user', JSON.stringify(userinfo))
      localStorage.setItem('logged', 'true')
      localStorage.setItem('admin', 'true')
    }

    isLogged(): boolean{
      return localStorage.getItem('logged')==='true';
    }

    isAdmin(): boolean{
      return localStorage.getItem('admin')==='true';
    }

    deslogar(){
      localStorage.removeItem('user')
      localStorage.removeItem('logged')
      localStorage.removeItem('admin')
      document.location.reload()
      this.http.get(`/smdecommerce/Logout`);
      
    }

    public setUserInfo(userinfo: any) {
      localStorage.setItem('user', JSON.stringify(userinfo))
    }
    
    public getUserInfo(){
      let userinfo: string | null = localStorage.getItem('user')

      if(userinfo==null){
        return null
      }
      return JSON.parse(userinfo)
    }

}