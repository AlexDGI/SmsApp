import { Component, Inject, OnInit, EventEmitter } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { ApiService } from 'src/app/services/api.service';

import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import Swal from 'sweetalert2';
import { Envios } from 'src/app/shared/models/envios.model';

@Component({
  selector: 'formularioCli',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit {

  public envio!: Envios;
  public formulario!: FormGroup;
  dialogRef: any;
  titulo!: string;

  constructor(
    private formBuilder: FormBuilder,    
    @Inject(MAT_DIALOG_DATA) private data: { action:string,envios:Envios},
    public matDialogRef: MatDialogRef<FormularioComponent>,
    private conexionServicio: ApiService
  ) { 
    if( data.action == "nuevo" ){
      this.titulo = "Crear Envío";
      this.envio = new Envios({})
    }else{
      this.titulo = "Modificar Envío";
      this.envio = data.envios;
    }
    
  }

  ngOnInit(): void {
    this.crearFormulario();
  }

  crearFormulario(){
    this.formulario = this.formBuilder.group({
      Id: [this.envio.Id],
      IdCliente: [this.envio.IdCliente],
      Nombre: [this.envio.Nombre],
      Fecha: [this.envio.Fecha],
      Registros: [this.envio.Registros],
      Estado: [this.envio.Estado],
    })
  }

  grabar(){
    if(this.data.action == "nuevo" ){
      console.log(this.formulario.value)
       this.conexionServicio.agregarEnvio(this.formulario.value).subscribe( (result:any) =>{
         this.matDialogRef.close(result);
         Swal.fire({
           icon: result['status'],
           title: result['mensaje'],
         });
       })
    }
    else{
      this.conexionServicio.modificarEnvio(this.formulario.value).subscribe( (result:any) =>{
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
