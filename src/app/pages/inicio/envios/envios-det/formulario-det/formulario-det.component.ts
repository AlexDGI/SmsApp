import { Component, Inject, OnInit, EventEmitter } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { ApiService } from 'src/app/services/api.service';


import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import Swal from 'sweetalert2';
import { Detalles } from '../../../../../shared/models/enviosDet.model';

@Component({
  selector: 'app-formulario-det',
  templateUrl: './formulario-det.component.html',
  styleUrls: ['./formulario-det.component.css']
})
export class FormularioDetComponent implements OnInit {

  public envio!: Detalles;
  public formulario!: FormGroup;
  dialogRef: any;
  Id!: number;
  Nombre:string='';
  msj:string='';
  titulo!: string;
  btnDesabilitado!: boolean;

  constructor(
    private formBuilder: FormBuilder,    
    @Inject(MAT_DIALOG_DATA) private data: { action:string,envios:Detalles, Id:string},
    public matDialogRef: MatDialogRef<FormularioDetComponent>,
    private conexionServicio: ApiService
  ) { 
    if( data.action == "nuevo" ){
      this.titulo = "Crear Detalle";
      this.envio = new Detalles({})
    }else{
      this.titulo = "Modificar Detalle";
      this.envio = data.envios;
    }
    
  }

  ngOnInit(): void {
    this.crearFormulario();
  }

  crearFormulario(){
    this.formulario = this.formBuilder.group({
      Id: [this.envio.Id],
      IdMae: [this.data.Id],
      Telefono: [this.envio.Telefono],
      Mensaje: [this.envio.Mensaje],
      Dato1: [this.envio.Dato1],
      Dato2: [this.envio.Dato2],
      Estado: [this.envio.Estado],
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
      console.log(this.formulario.value)
       this.conexionServicio.agregarDetalle(this.formulario.value).subscribe( (result:any) =>{
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
      this.conexionServicio.modificarDetalle(this.formulario.value).subscribe( (result:any) =>{
        Swal.close();
        this.btnDesabilitado = false;
        console.log(this.formulario.value);
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
