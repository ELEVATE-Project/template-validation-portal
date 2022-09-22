import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TemplateSelectionComponent } from './template-selection/template-selection.component';
import { ValidationResultComponent } from './validation-result/validation-result.component';
import { TemplateSuccessComponent } from './template-success/template-success.component';
import { MaterialModule } from 'src/app/material.module';
import { TemplateRoutingModule } from './template.routing.module';



@NgModule({
  declarations: [
    TemplateSelectionComponent,
    ValidationResultComponent,
    TemplateSuccessComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    TemplateRoutingModule
  ]
})
export class TemplateModule { }
