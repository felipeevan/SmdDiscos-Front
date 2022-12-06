import { AuthComponent } from './auth.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import {MatCardModule} from '@angular/material/card';
import {MatTabsModule} from '@angular/material/tabs';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { ClienteService } from '../services/cliente.service';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { AdminloginComponent } from './adminlogin/adminlogin.component';
import { AdminService } from '../services/admin.service';

@NgModule({
  declarations: [
    AuthComponent,
    AdminloginComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatSnackBarModule
  ],
  exports:[
    AuthComponent
  ],
  providers:[
    ClienteService,
    AdminService
  ]
})
export class AuthModule { }
