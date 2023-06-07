import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.component.html',
  styleUrls: ['./configuracion.component.css'],
})
export class ConfiguracionComponent implements OnInit {
  btnDesabilitado!: boolean;
  public formulario!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private apiServicio: ApiService
  ) {
    this.formulario = formBuilder.group({
      Id: [localStorage.getItem('IdUser')],
      clave: ['', [Validators.required, Validators.minLength(6)]],
      vClave: ['', [Validators.required, confirmPasswordValidator]],
    });
  }
  ngOnInit(): void {}

  cambiarClave() {
    Swal.fire({
      title: 'Espera',
      html: 'Procesando petición',
      allowOutsideClick: false,
      allowEscapeKey: false,
      timerProgressBar: true,

      didOpen: () => {
        Swal.showLoading();
      },
    });
    this.btnDesabilitado = true;

    console.log(this.formulario.value);
    this.apiServicio
      .cambiarClave(this.formulario.value)
      .subscribe((result: any) => {
        Swal.close();
        this.btnDesabilitado = false;
        Swal.fire({
          icon: result['status'],
          title: result['mensaje'],
        });
        this.router.navigate(['inicio/Envios']);
      });
  }
}
export const confirmPasswordValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  if (!control.parent || !control) {
    return null;
  }

  const password = control.parent.get('clave');
  const passwordConfirm = control.parent.get('vClave');

  if (!password || !passwordConfirm) {
    return null;
  }

  if (passwordConfirm.value === '') {
    return null;
  }

  if (password.value === passwordConfirm.value) {
    return null;
  }

  return { passwordsNotMatching: true };
};
