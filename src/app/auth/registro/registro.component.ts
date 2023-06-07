import { calcPossibleSecurityContexts } from '@angular/compiler/src/template_parser/binding_parser';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, MaxLengthValidator, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})


export class RegistroComponent implements OnInit {

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
  matDialogRef: any;
  btnDesabilitado!: boolean;


  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private apiServicio: ApiService
  )
  {
    this.formulario = formBuilder.group({
      nombre: ['',Validators.required],
      email: ['',[Validators.required, Validators.email]],
      idFiscal: ['',Validators.required],
      tlf: ['',[Validators.required,Validators.maxLength(11),Validators.minLength(11)]],
      clave: ['',[Validators.required,Validators.minLength(6)]],
      vClave: ['',[Validators.required,confirmPasswordValidator]],
      empresa: ['',[Validators.required]],
  });
  }
  ngOnInit(): void {
  }

  registrar(){

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
         this.apiServicio.registrarUsuario(this.formulario.value).subscribe( (result:any) =>{
          Swal.close();
          this.btnDesabilitado = false;
           Swal.fire({
             icon: result['status'],
             title: result['mensaje'],
           });
           this.router.navigate(['auth']);
         });
        }

        
}
export const confirmPasswordValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {

  if ( !control.parent || !control )
  {
      return null;
  }

  const password = control.parent.get('clave');
  const passwordConfirm = control.parent.get('vClave');

  if ( !password || !passwordConfirm )
  {
      return null;
  }

  if ( passwordConfirm.value === '' )
  {
      return null;
  }

  if ( password.value === passwordConfirm.value )
  {
      return null;
  }

  return {passwordsNotMatching: true};
};