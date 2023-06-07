import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { RegistroComponent } from './auth/registro/registro.component';
import { ClientesComponent } from './pages/inicio/clientes/clientes.component';
import { DefinicionesComponent } from './pages/inicio/definiciones/definiciones.component';
import { EnviosComponent } from './pages/inicio/envios/envios.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { SaldoComponent } from './pages/inicio/saldo/saldo.component';
import { SubirDocComponent } from './pages/inicio/subir-doc/subir-doc.component';
import { RecuperarComponent } from './auth/recuperar/recuperar.component';
import { ConfiguracionComponent } from './pages/inicio/configuracion/configuracion.component';



const routes: Routes = [
  { path: "auth", component: AuthComponent},
  { path: "registro", component: RegistroComponent},
  { path: "recuperar", component: RecuperarComponent},
  { path: "inicio", component: InicioComponent,
  children:[
    { path:'SubirDoc',component:SubirDocComponent},
    { path: "Definiciones", component: DefinicionesComponent},
    { path: "Clientes", component: ClientesComponent},
    { path: "Saldo", component: SaldoComponent},
    { path: "Configuracion", component: ConfiguracionComponent},
    { path:'**',component:EnviosComponent},
      //  { path: "definiciones", component: DefinicionesComponent},
      //  { path:'**',component:RegistroLiquidacionComponent},
     ]},
  { path: "**", component: AuthComponent},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{ useHash: true }),],
  exports: [RouterModule]
})
export class AppRoutingModule { }