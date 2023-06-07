import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SaldoComponent } from './saldo.component';
import { MaterialModule } from 'src/app/material.module';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormularioComponent } from './formulario/formulario.component';



@NgModule({
  declarations: [
    SaldoComponent,
    FormularioComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class SaldoModule { }
