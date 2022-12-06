import { UserconfigComponent } from './userconfig.component';
import { LayoutModule } from '../layout/layout.module';
import { NgModule } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon'; 
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularFormsInputMasksModule } from 'angular-forms-input-masks';
import { SessionService } from '../services/session.service';

@NgModule({
    declarations: [
        UserconfigComponent,
    ],
    imports: [
        LayoutModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatCardModule,
        MatButtonModule,
        ReactiveFormsModule,
        AngularFormsInputMasksModule
    ],
    exports:[
        UserconfigComponent,
    ],
    providers: [
        SessionService
    ]
})
export class UserConfigModule{ }