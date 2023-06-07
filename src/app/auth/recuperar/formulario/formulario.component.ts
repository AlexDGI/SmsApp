import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit {

  public formulario!: FormGroup;

  matDialogRef: any;
  btnDesabilitado!: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private apiServicio: ApiService
  ) {
    this.formulario = formBuilder.group({
    //  nombre: ['',Validators.required],
  });
  }

  ngOnInit(): void {
  }

  actualizarClave(){}

}

