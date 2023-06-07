import { Component, Inject, OnInit, EventEmitter } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { ApiService } from 'src/app/services/api.service';

import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import Swal from 'sweetalert2';
import { Recargas } from '../../../../shared/models/recargas.model';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit {

  public recargas!: Recargas;
  public formulario!: FormGroup;
  dialogRef: any;
  titulo!: string;
  accion!:boolean;
  btnDesabilitado!: boolean;

  constructor(
    private formBuilder: FormBuilder,    
    @Inject(MAT_DIALOG_DATA) private data: { action:string,recarga:Recargas},
    public matDialogRef: MatDialogRef<FormularioComponent>,
    private conexionServicio: ApiService
  ) { 
    if( data.action == "nuevo" ){
      this.titulo = "Crear Recarga";
      this.accion = false;
      this.recargas = new Recargas({})
    }else{
      this.titulo = "Modificar Recarga";
      this.accion = true;
      this.recargas = data.recarga;
    }
    
  }

  ngOnInit(): void {
    this.crearFormulario();
    console.log(this.formulario);
  }

  crearFormulario(){
    this.formulario = this.formBuilder.group({
      Id: [this.recargas.Id],
      Fecha: [this.recargas.Fecha],
      Forma: [this.recargas.Forma],
      Referencia: [this.recargas.Referencia],
      FecTransaccion: [this.recargas.FecTransaccion],
      Monto: [this.recargas.Monto],
      Banco: [this.recargas.Banco],
      Cuenta: [this.recargas.Cuenta],
      FecVerificacion: [this.recargas.FecVerificacion],
      UsrVerifico: [this.recargas.UsrVerifico],
      CantidSms: [this.recargas.CantidSms],
      Estado: [this.recargas.Estado],
      Imagen: [this.recargas.Imagen],
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
       this.conexionServicio.agregarRecarga(this.formulario.value).subscribe( (result:any) =>{
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
      this.conexionServicio.modificarRecarga(this.formulario.value).subscribe( (result:any) =>{
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
