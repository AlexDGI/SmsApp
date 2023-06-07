import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InicioComponent } from './inicio.component';
import { MaterialModule } from 'src/app/material.module';
import { RouterModule } from '@angular/router';
import { SubirDocComponent } from './subir-doc/subir-doc.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClientesComponent } from './clientes/clientes.component';
import { DefinicionesModule } from './definiciones/definiciones.module';
import { ClientesModule } from './clientes/clientes.module';
import { EnviosComponent } from './envios/envios.component';
import { EnviosDetComponent } from './envios/envios-det/envios-det.component';
import { EnviosModule } from './envios/envios.module';
import { SaldoComponent } from './saldo/saldo.component';
import { SaldoModule } from './saldo/saldo.module';
import { ConfiguracionComponent } from './configuracion/configuracion.component';




@NgModule({
  declarations: [
    InicioComponent,
    SubirDocComponent,
    ConfiguracionComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    FormsModule,
    MaterialModule,
    ReactiveFormsModule,
    SaldoModule,
  ],
  exports: [
    InicioComponent,
    SubirDocComponent,
    MaterialModule,
    RouterModule,
    FormsModule,
    MaterialModule,
    ReactiveFormsModule,
  ]
})
export class InicioModule { }
