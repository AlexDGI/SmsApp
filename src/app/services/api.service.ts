import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { Sms } from '../shared/models/sms.models';
import { Clientes } from '../shared/models/clientes.model';
import { Definiciones } from '../shared/models/definiciones.model';
import { Envios } from '../shared/models/envios.model';
import { Detalles } from '../shared/models/enviosDet.model';
import { Recargas } from '../shared/models/recargas.model';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn:'root'
})
export class ApiService {
  
  url = environment.apiUrl;

  @Output() conect = new EventEmitter<boolean>();


  constructor(private http: HttpClient) { }

  
  registrarUsuario(user:any){
    return this.http.post<string>(`${this.url}registro_usuario.php`, JSON.stringify(user));
  }
  recuperarClave(login:any){
    return this.http.post<string>(`${this.url}recuperar_clave.php`, JSON.stringify(login));
  }
  cambiarClave(form:any){
    return this.http.post<string>(`${this.url}modificar_clave.php`, JSON.stringify(form));
  }
  validarLogin(formulario:any) {
    return this.http.post(`${this.url}login.php`,JSON.stringify(formulario));
  }

  recuperarIdFiscal(){
    return this.http.get(`${this.url}recuperar_IdFiscal.php`)
  }

  recuperarSaldoSms(IdCLiente:any){
    return this.http.post(`${this.url}recuperar_SaldoSms.php`, IdCLiente)
  }

  recuperarEnvios():Observable<Envios[]> {
    return this.http.get<Envios[]>(`${this.url}recuperar_env_mae.php`)
  }
  
  
  eliminarEnvio(Id:number) {
    return this.http.get(`${this.url}eliminar_envio.php?Id=${Id}`);
  }
  
  recuperarClientes():Observable<Clientes[]> {
    return this.http.get<Clientes[]>(`${this.url}recuperar_clientes.php`)
  }
  
  agregarCliente(cliente:Clientes):Observable<string> {
    return this.http.post<string>(`${this.url}agregar_cliente.php`, JSON.stringify(cliente));
  }
  
  modificarCliente(Id:Clientes):Observable<string> {
    console.log(Id);
    return this.http.post<string>(`${this.url}modificar_cliente.php`, JSON.stringify(Id));
  }
  
  eliminarCliente(Id:number) {
    return this.http.get(`${this.url}eliminar_cliente.php?Id=${Id}`);
  }
  
  agregarEnvio(envio:Envios):Observable<string> {
    return this.http.post<string>(`${this.url}agregar_mae_env.php`, JSON.stringify(envio));
  }
  
  modificarEnvio(Id:Envios):Observable<string> {
    return this.http.post<string>(`${this.url}modificar_mae_env.php`, JSON.stringify(Id));
  }
  
  agregarSms(element:Sms):Observable<any> {
    return this.http.post(`${this.url}grabar_sms.php`, JSON.stringify(element));
  }
  
  recuperarEnviosDet(Id:Detalles):Observable<Detalles[]> {
    return this.http.get<Detalles[]>(`${this.url}recuperar_env_det.php?Id=${Id}`)
  }

  agregarDetalle(detalle:Detalles):Observable<string> {
    return this.http.post<string>(`${this.url}agregar_det_env.php`, JSON.stringify(detalle));
  }

  modificarDetalle(Id:Detalles):Observable<string> {
    return this.http.post<string>(`${this.url}modificar_det_env.php`, JSON.stringify(Id));
  }

  eliminarDetalle(Id:number) {
    return this.http.get(`${this.url}eliminar_det_env.php?Id=${Id}`);
  }

  recuperarRecargas():Observable<Recargas[]> {
    return this.http.get<Recargas[]>(`${this.url}recuperar_recargas.php`)
  }

  agregarRecarga(recarga:Recargas):Observable<string> {
    return this.http.post<string>(`${this.url}agregar_recarga.php`, JSON.stringify(recarga));
  }
  
  modificarRecarga(Id:Recargas):Observable<string> {
    return this.http.post<string>(`${this.url}modificar_recarga.php`, JSON.stringify(Id));
  }
  
  aprobarRecarga(recarga:Recargas):Observable<string> {
    return this.http.post<string>(`${this.url}aprobar_recarga.php`, JSON.stringify(recarga));
  }

  eliminarRecarga(Id:string) {
    return this.http.get(`${this.url}eliminar_recarga.php?Id=${Id}`);
  }

  recuperarDefiniciones():Observable<Definiciones[]> {
    return this.http.get<Definiciones[]>(`${this.url}definiciones.php`)
  }

  agregarDefinicion(definiciones:Definiciones):Observable<string> {
    return this.http.post<string>(`${this.url}agregar_definicion.php`, JSON.stringify(definiciones));
  }
  
  modificarDefinicion(Id:Definiciones):Observable<string> {
    console.log(Id);
    return this.http.post<string>(`${this.url}modificar_definicion.php`, JSON.stringify(Id));
  }

  eliminarDefinicion(Id:string) {
    return this.http.get(`${this.url}eliminar_definicion.php?id=${Id}`);
  }

  seleccionarDefinicion(Id:any) {
    return this.http.get(`${this.url}seleccionar_definicion.php?Id=${Id}`);
  }

  eliminar(id:number) {
    return this.http.get(`${this.url}eliminar_bon_med.php?id=${id}`);
  }

  seleccionar2(NumLiquidacion:any) {
    return this.http.get(`${this.url}seleccionar2.php?NumLiquidacion=${NumLiquidacion}`);
  }

  
  subirArchivo(archivo:any):Observable<any>{
    return this.http.post(`${this.url}cargar_archivo.php`, archivo, {
      reportProgress: true,
      observe: 'events'
    });
  }
}