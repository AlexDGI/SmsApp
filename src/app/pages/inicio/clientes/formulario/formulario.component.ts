import { Component, Inject, OnInit, EventEmitter } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';

import { ApiService } from 'src/app/services/api.service';


import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Definiciones } from 'src/app/shared/models/definiciones.model';
import Swal from 'sweetalert2';
import { Clientes } from '../../../../shared/models/clientes.model';

export interface Def {
  Id: Number,
  Nombre: string,
  Siglas: string,
  Valor: string
}

@Component({
  selector: 'formularioCli',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit {

  public clientes!: Clientes;
  public formulario!: FormGroup;
  dialogRef: any;
  Id!: number;
  Nombre:string='';
  msj:string='';
  titulo!: string;

  constructor(
    private formBuilder: FormBuilder,    
    @Inject(MAT_DIALOG_DATA) private data: { action:string,clientes:Clientes},
    public matDialogRef: MatDialogRef<FormularioComponent>,
    private conexionServicio: ApiService
  ) { 
    if( data.action == "nuevo" ){
      this.titulo = "Crear Cliente";
      this.clientes = new Clientes({})
    }else{
      this.titulo = "Modificar Cliente";
      this.clientes = data.clientes;
    }
    
  }

  ngOnInit(): void {
    this.crearFormulario();
  }

  crearFormulario(){
    this.formulario = this.formBuilder.group({
      Id: [this.clientes.Id],
      IdFiscal: [this.clientes.IdFiscal],
      RazonSocial: [this.clientes.RazonSocial],
      FirmaSms: [this.clientes.FirmaSms],
      NombreContacto: [this.clientes.NombreContacto],
      TlfContacto: [this.clientes.TlfContacto],
      EmailContacto: [this.clientes.EmailContacto],
      Estado: [this.clientes.Estado],
    })
  }

  grabar(){
    if(this.data.action == "nuevo" ){
      //console.log(this.formulario.value)
       this.conexionServicio.agregarCliente(this.formulario.value).subscribe( (result:any) =>{
         this.matDialogRef.close(result);
         Swal.fire({
           icon: result['status'],
           title: result['mensaje'],
         });
       })
    }
    else{
      this.conexionServicio.modificarCliente(this.formulario.value).subscribe( (result:any) =>{
        //console.log(this.formulario.value);
        this.matDialogRef.close(result);
        Swal.fire({
          icon: result['status'],
          title: result['mensaje'],
        });
      },
)
    }
  }

}
