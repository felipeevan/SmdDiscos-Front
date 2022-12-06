import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutModule } from '../layout/layout.module';

import {MatCardModule} from '@angular/material/card';
import {MatListModule} from '@angular/material/list';
import {MatExpansionModule} from '@angular/material/expansion';

import { NgxChartsModule } from '@swimlane/ngx-charts';
import { MatTableModule} from '@angular/material/table';
import { MatIconModule} from '@angular/material/icon';
import { MatButtonModule} from '@angular/material/button';
import { MatDialogModule} from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { PedidosclienteComponent } from './pedidoscliente.component';
import { MatChipsModule } from '@angular/material/chips';

@NgModule({
    declarations: [
        PedidosclienteComponent,
    ],
    imports: [
        CommonModule,
        LayoutModule,
        MatCardModule,
        MatListModule,
        MatExpansionModule,
        NgxChartsModule,
        MatTableModule,
        MatIconModule,
        MatButtonModule,
        MatDialogModule,
        MatPaginatorModule,
        MatSortModule,
        MatChipsModule
    ],
    exports:[
        PedidosclienteComponent,
    ],
    providers: [
    ]
})
export class PedidosClienteModule{ }