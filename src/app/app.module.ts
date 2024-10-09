import { MatIconModule } from '@angular/material/icon';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { FormlyComponent } from './formly/formly.component';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyMaterialModule } from '@ngx-formly/material';
import { FormGeneratorComponent } from './form-generator/form-generator.component';
import { RepeatFieldComponent } from './repeat-field/repeat-field.type';
import { FormlyMatFormFieldModule } from '@ngx-formly/material/form-field';
import { FormlyMatMultiCheckboxModule } from '@ngx-formly/material/multicheckbox';
import { NgxJsonViewerModule } from 'ngx-json-viewer';

@NgModule({
  declarations: [
    AppComponent,
    FormlyComponent,
    FormGeneratorComponent,
    RepeatFieldComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    FormlyModule.forRoot({
      types: [{
        name: 'repeat',
        component: RepeatFieldComponent,
        // defaultOptions: {
        //   expressions: { hide: "model.field_type !== 'select'" }
        // }
      }],
    }),
    FormlyMatFormFieldModule,
    FormlyMaterialModule,
    FormlyMatMultiCheckboxModule,
    NgxJsonViewerModule
  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync()
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
