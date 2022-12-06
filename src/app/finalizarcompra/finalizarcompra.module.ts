import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MatCardModule } from "@angular/material/card";
import { MatChipsModule } from "@angular/material/chips";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatIconModule } from "@angular/material/icon";
import { MatListModule } from "@angular/material/list";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { CartService } from "../services/cart.service";
import { TilesModule } from "../tiles/tiles.module";
import { FinalizarcompraComponent } from "./finalizarcompra.component";
import { LayoutModule } from '../layout/layout.module';
import { MatButtonModule } from "@angular/material/button";
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { FormsModule } from "@angular/forms";

@NgModule({
  declarations: [
    FinalizarcompraComponent
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
    MatProgressSpinnerModule,
    MatButtonModule,
    MatButtonToggleModule,
    FormsModule
  ],
  exports:[
    FinalizarcompraComponent
  ],
  providers:[
    CartService
  ]
})
export class FinalizarCompraModule { }