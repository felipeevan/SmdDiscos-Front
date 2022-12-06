import { NgModule } from '@angular/core';
import { DetalhesprodutoComponent } from './detalhesproduto.component';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import { CartService } from '../services/cart.service';
import { FormsModule } from '@angular/forms';
import { LayoutModule } from '../layout/layout.module';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations: [
    DetalhesprodutoComponent
  ],
  imports: [
    MatIconModule,
    MatDividerModule,
    FormsModule,
    LayoutModule,
    BrowserModule 
  ],
  exports:[
    DetalhesprodutoComponent
  ],
  providers:[
    CartService
  ]
})
export class DetalhesprodutoModule { }