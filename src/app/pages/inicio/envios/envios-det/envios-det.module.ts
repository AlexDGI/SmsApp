import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EnviosDetComponent } from './envios-det.component';
import { InicioModule } from '../../inicio.module';
import { FormularioDetComponent } from './formulario-det/formulario-det.component';



@NgModule({
  declarations: [
    EnviosDetComponent,
    FormularioDetComponent
  ],
  imports: [
    CommonModule,
    InicioModule
  ],exports:[
    EnviosDetComponent
  ]
})
export class EnviosDetModule { }
