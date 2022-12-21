import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';
import { CustomTooltipDirective } from './directives/custom-tooltip.directive';
import { TableCellErrorDialogsComponent } from './dialogs/table-cell-error-dialogs/table-cell-error-dialogs.component';
import {MatDialogModule} from '@angular/material/dialog';



@NgModule({
  declarations: [CustomTooltipDirective,TableCellErrorDialogsComponent],
  imports: [
    CommonModule,
    MaterialModule,
    MatDialogModule
  ],
  exports : [CustomTooltipDirective,TableCellErrorDialogsComponent]
})
export class SharedModule { }
