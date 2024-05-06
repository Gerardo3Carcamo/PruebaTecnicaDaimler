import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';

@NgModule({
  imports: [RouterModule.forRoot([
    { path: '', component: LoginComponent },
    { path: 'pages', loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule) }
  ])
],
  exports: [RouterModule]
})
export class AppRoutingModule { }
