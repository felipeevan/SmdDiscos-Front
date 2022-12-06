import { TilesModule } from './../tiles/tiles.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { LayoutModule } from '../layout/layout.module';

import {MatCardModule} from '@angular/material/card';
import {MatListModule} from '@angular/material/list';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatChipsModule} from '@angular/material/chips';
import { SpecificCategoriaComponent } from './specific-categoria/specific-categoria.component';
import { SearchService } from '../services/search.service';
import { MatIconModule } from '@angular/material/icon';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';


@NgModule({
  declarations: [
    HomeComponent,
    SpecificCategoriaComponent
  ],
  imports: [
    CommonModule,
    LayoutModule,
    MatCardModule,
    MatListModule,
    MatExpansionModule,
    MatChipsModule,
    TilesModule,
    MatIconModule,
    MatProgressSpinnerModule
  ],
  exports:[
    HomeComponent,
  ],
  providers:[
    SearchService
  ]
})
export class HomeModule { }
