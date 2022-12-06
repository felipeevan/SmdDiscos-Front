import { Injectable } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Injectable()
export class SidenavService {
    private sidenav!: MatSidenav;
    private menu!: MatSidenav;

    public setSidenav(sidenav: MatSidenav) {
        this.sidenav = sidenav;
    }
    public open() {
        return this.sidenav.open();
    }
    public close() {
        return this.sidenav.close();
    }
    public toggle(): void {
        this.sidenav.toggle();
    }



    public setSidenavMenu(menu: MatSidenav) {
        this.menu = menu;
    }
    public toggleMenu(): void {
        this.menu.toggle();
    }
    
} 