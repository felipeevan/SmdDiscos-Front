import { HeaderModule } from './../header/header.module';
import { SidenavModule } from './../sidenav/sidenav.module';
import { DefaultComponent } from './default/default.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminDefaultComponent } from './admin-default/admin-default.component';

@NgModule({
  declarations: [
    DefaultComponent,
    AdminDefaultComponent
  ],
  imports: [
    CommonModule,
    SidenavModule,
    HeaderModule
  ],
  exports:[
    DefaultComponent
  ],
})
export class LayoutModule { }
