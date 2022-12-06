import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SidenavComponent } from './sidenav.component';

import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import { SidenavService } from './sidenav.service';
import { SidenavDrawerComponent } from './sidenav-drawer/sidenav-drawer.component';
import { TilesModule } from '../tiles/tiles.module';
import { MenuDrawerComponent } from './menu-drawer/menu-drawer.component';
import {MatListModule} from '@angular/material/list';
import {MatRippleModule} from '@angular/material/core';
import {MatIconModule} from '@angular/material/icon';
import { ClienteService } from '../services/cliente.service';


@NgModule({
  declarations: [
      SidenavComponent,
      SidenavDrawerComponent,
      MenuDrawerComponent
  ],
  imports: [
    CommonModule,
    MatSidenavModule,
    MatButtonModule,
    TilesModule,
    MatListModule,
    MatRippleModule,
    MatIconModule
  ],
  exports:[
    SidenavComponent
  ],
  providers: [SidenavService, ClienteService]
})
export class SidenavModule { }
