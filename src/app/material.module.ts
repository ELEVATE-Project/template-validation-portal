import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTableModule} from '@angular/material/table';


@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [],
    providers: [],
    exports: [MatFormFieldModule, MatInputModule, MatIconModule, MatSelectModule,
        MatButtonModule,MatCardModule,MatToolbarModule,MatPaginatorModule,MatTableModule]
})
export class MaterialModule { }
