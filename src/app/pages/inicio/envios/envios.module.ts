import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EnviosDetComponent } from './envios-det/envios-det.component';
import { EnviosComponent } from './envios.component';
import { MaterialModule } from 'src/app/material.module';
import { FormularioComponent } from './formulario/formulario.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { EnviosDetModule } from './envios-det/envios-det.module';



@NgModule({
  declarations: [
    EnviosComponent,
    FormularioComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    EnviosDetModule
  ],exports:[
    EnviosComponent,
    ReactiveFormsModule,
  ]
})
export class EnviosModule { }
