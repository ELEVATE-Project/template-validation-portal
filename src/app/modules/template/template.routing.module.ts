import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TemplateSelectionComponent } from './template-selection/template-selection.component';
import { TemplateSuccessComponent } from './template-success/template-success.component';
import { ValidationResultComponent } from './validation-result/validation-result.component';


const routes: Routes = [
  {
    path: 'template-selection', component: TemplateSelectionComponent
  },
  {
    path: 'validation-result', component: ValidationResultComponent
  },
  {
    path: 'template-success', component:TemplateSuccessComponent 
  },
  {
    path:'',redirectTo:'template-selection',pathMatch:'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TemplateRoutingModule { }
