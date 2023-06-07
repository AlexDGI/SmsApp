import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-recuperar',
  templateUrl: './recuperar.component.html',
  styleUrls: ['./recuperar.component.css'],
})
export class RecuperarComponent implements OnInit {
  public formulario!: FormGroup;

  matDialogRef: any;
  btnDesabilitado!: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private apiServicio: ApiService
  ) {
    this.formulario = formBuilder.group({
      login: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  actualizarClave() {
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
      .recuperarClave(this.formulario.value)
      .subscribe((result: any) => {
        console.log(result);
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
