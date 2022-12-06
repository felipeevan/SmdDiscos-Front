import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeaderComponent } from './header.component';

import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatBadgeModule} from '@angular/material/badge';

import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { CartService } from '../services/cart.service';
import { SearchService } from '../services/search.service';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
      HeaderComponent
  ],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatBadgeModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule
  ],
  exports:[
      HeaderComponent
  ],
  providers: [
    CartService,
    SearchService
  ]
})
export class HeaderModule { }
