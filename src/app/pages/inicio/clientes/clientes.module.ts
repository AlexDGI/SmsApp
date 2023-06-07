import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormularioComponent } from './formulario/formulario.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InicioModule } from '../inicio.module';
import { MaterialModule } from 'src/app/material.module';
import { ClientesComponent } from './clientes.component';



@NgModule({
  declarations: [
    ClientesComponent,
    FormularioComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    InicioModule,
    ReactiveFormsModule,
    MaterialModule,
  ],exports:[
    ClientesComponent,
    ReactiveFormsModule,
  ]
})
export class ClientesModule { }
