import { CartTileComponent } from './cart-tile/cart-tile.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import {MatDialogModule} from '@angular/material/dialog';
import { ProdutoDialogComponent } from './produto-dialog/produto-dialog.component';
import { ProdutoTileComponent } from './produto-tile/produto-tile.component';
import {MatCardModule} from '@angular/material/card';
import {MatChipsModule} from '@angular/material/chips';
import { CategoriaDialogComponent } from './categoria-dialog/categoria-dialog.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import {TextFieldModule} from '@angular/cdk/text-field';
import { TwoDigitDecimaNumberDirective } from './produto-dialog/float.directive';
import {MatSelectModule} from '@angular/material/select';
import { CompraTileComponent } from './compra-tile/compra-tile.component';

@NgModule({
  declarations: [
    CartTileComponent,
    ConfirmDialogComponent,
    ProdutoDialogComponent,
    ProdutoTileComponent,
    CategoriaDialogComponent,
    TwoDigitDecimaNumberDirective,
    CompraTileComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatCardModule,
    MatChipsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    TextFieldModule,
    MatSelectModule
  ],
  exports:[
    CartTileComponent,
    ProdutoTileComponent,
    CompraTileComponent,
  ],
})
export class TilesModule { }
