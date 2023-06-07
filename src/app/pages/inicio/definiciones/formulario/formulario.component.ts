import { Component, Inject, OnInit, EventEmitter } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';

import { ApiService } from 'src/app/services/api.service';


import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Definiciones } from 'src/app/shared/models/definiciones.model';
import Swal from 'sweetalert2';

export interface Def {
  Id: Number,
  Nombre: string,
  Siglas: string,
  Valor: string
}

@Component({
  selector: 'formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit {

  public definiciones!: Definiciones;
  public formulario!: FormGroup;
  dialogRef: any;
  Id!: number;
  Nombre:string='';
  msj:string='';
  titulo!: string;
  btnDesabilitado!: boolean;

  constructor(
    private formBuilder: FormBuilder,    
    @Inject(MAT_DIALOG_DATA) private data: { action:string,definiciones:Definiciones},
    public matDialogRef: MatDialogRef<FormularioComponent>,
    private conexionServicio: ApiService
  ) { 
    if( data.action == "nuevo" ){
      this.titulo = "Crear Definición";
      this.definiciones = new Definiciones({})
    }else{
      this.titulo = "Modificar Definición";
      this.definiciones = data.definiciones;
    }
    
  }

  ngOnInit(): void {
    this.crearFormulario();
  }

  crearFormulario(){
    this.formulario = this.formBuilder.group({
      Id: [this.definiciones.Id],
      Nombre: [this.definiciones.Nombre],
      Siglas: [this.definiciones.Siglas],
      Valor: [this.definiciones.Valor],
    })
  }

  grabar(){
    
    Swal.fire({
      title: "Espera",
      html: "Procesando petición",
      allowOutsideClick: false,
      allowEscapeKey: false,
      timerProgressBar: true,
      
      didOpen: () => {
       
          Swal.showLoading();
      },

  }) 
  this.btnDesabilitado = true;

    if(this.data.action == "nuevo" ){
      //console.log(this.formulario.value)
       this.conexionServicio.agregarDefinicion(this.formulario.value).subscribe( (result:any) =>{
        Swal.close();
        this.btnDesabilitado = false;
         this.matDialogRef.close(result);
         Swal.fire({
           icon: result['status'],
           title: result['mensaje'],
         });
       })
    }
    else{
      this.conexionServicio.modificarDefinicion(this.formulario.value).subscribe( (result:any) =>{
        Swal.close();
        this.btnDesabilitado = false;
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
