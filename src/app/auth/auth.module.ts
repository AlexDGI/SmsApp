import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material.module';
import { FormGroup, FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthComponent } from './auth.component';
import { RegistroComponent } from './registro/registro.component';
import { RecuperarComponent } from './recuperar/recuperar.component';
import { FormularioComponent } from './recuperar/formulario/formulario.component';


@NgModule({
  declarations: [
    AuthComponent,
    RegistroComponent,
    RecuperarComponent,
    FormularioComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    AuthComponent,
    RegistroComponent,
    RecuperarComponent,
    FormularioComponent
  ]
})
export class AuthModule { }
