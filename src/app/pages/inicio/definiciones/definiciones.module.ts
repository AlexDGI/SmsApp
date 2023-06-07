import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefinicionesComponent } from './definiciones.component';
import { FormularioComponent } from './formulario/formulario.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material.module';
import { InicioModule } from '../inicio.module';



@NgModule({
  declarations: [
    DefinicionesComponent,
    FormularioComponent
],
  imports: [
    CommonModule,
    FormsModule,
    InicioModule,
    ReactiveFormsModule,
    MaterialModule
  ],exports:[
    DefinicionesComponent,
    ReactiveFormsModule,
  ]
})
export class DefinicionesModule { }
