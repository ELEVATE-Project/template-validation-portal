import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';
import { CustomTooltipDirective } from './directives/custom-tooltip.directive';



@NgModule({
  declarations: [CustomTooltipDirective],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports : [CustomTooltipDirective]
})
export class SharedModule { }
