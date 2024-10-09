import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormlyComponent } from './formly/formly.component';
import { FormGeneratorComponent } from './form-generator/form-generator.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'formly'
  },
  {
    path: 'formly',
    component: FormlyComponent
  },
  {
    path: 'generate-form',
    component: FormGeneratorComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
