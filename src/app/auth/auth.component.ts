import { Component, OnInit } from '@angular/core';

import { FormGroup, FormBuilder, FormControl } from "@angular/forms";

import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ApiService } from '../services/api.service';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  public formulario!: FormGroup;
  nombre!: '';
  Bds!:[];
  clientes!: [{
    base:'',
    nombre:''
  }];
  value!:'';
  verEmpresa!: boolean;
  rutCli!:'';
  btnDesabilitado!: boolean;
  idUsr: any;
  status: any;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private apiServicio: ApiService
  ) {
    this.formulario = new FormGroup({
      login: new FormControl(),
      clave: new FormControl(),
      clientes: new FormControl(),
  });
  }

   ingresar(formulario:any){

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

     console.log(this.formulario.value);
     this.apiServicio.validarLogin(this.formulario.value).subscribe((RazonSocial:any) => {
      console.log(RazonSocial);
      Swal.close();
      this.btnDesabilitado = false;
      this.status=RazonSocial['status'];
      if(this.status=='warning'){
        Swal.fire({
          icon: this.status,
          title: RazonSocial['mensaje'],
        });
      }else{
        this.idUsr=RazonSocial[0]['id_usuario'];
        this.rutCli=RazonSocial[0]['IdFiscalCliente'];
        console.log(RazonSocial[0]);
        localStorage.setItem("IdUser", this.idUsr);
        localStorage.setItem("RazonSocial",RazonSocial[0].base);
        localStorage.setItem("IdFiscalCliente",this.rutCli);
        this.router.navigate(['inicio']);
      }
     });
  };


  irARegistro(){
    this.router.navigate(['registro']);
  }

  irARecClave(){
    this.router.navigate(['recuperar']);
  }

  seleccionarAcceso({value}:any){
    localStorage.setItem("RazonSocial", value);
    localStorage.setItem("IdFiscalCliente",this.rutCli);
    this.router.navigate(['inicio']);
     //this.router.navigateByUrl("/principal");
  };

  ngOnInit(): void {
  }

}
