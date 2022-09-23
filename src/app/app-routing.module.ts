import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './modules/shared/guard/auth.guard';

const routes: Routes = [
  {
    path: 'auth', loadChildren: () => import('../app/modules/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'template',canActivate:[AuthGuard],loadChildren: () => import('../app/modules/template/template.module').then(m => m.TemplateModule)
  },
  {
    path: '', redirectTo: 'auth',pathMatch:'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
