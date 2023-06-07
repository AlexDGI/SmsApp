import { Component, Input, OnInit, VERSION } from '@angular/core';

import {
  HttpClientModule,
  HttpClient,
  HttpRequest,
  HttpResponse,
  HttpEventType,
} from '@angular/common/http';
import { finalize } from 'rxjs/operators';

import { ApiService } from 'src/app/services/api.service';

import { Papa } from 'ngx-papaparse';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';
import { MatFormFieldControl } from '@angular/material/form-field';
import { TitleService } from 'src/app/services/title.service';
import { CsvService } from 'src/app/services/csv.service';
import * as XLSX from 'xlsx';
import { FileUploadService } from 'src/app/services/file-upload.service';

@Component({
  selector: 'app-subir-doc',
  templateUrl: './subir-doc.component.html',
  styleUrls: ['./subir-doc.component.css'],
})
export class SubirDocComponent implements OnInit {
  @Input() requiredFileType!: string;

  arrayBuffer: any;
  file!: File;
  loading: boolean = false;
  json!: {};
  arrayCall = [];
  botonSubir = true;
  archivos: any[] = [];
  matDialogRef: any;
  inputArchivo = '';
  uploadProgress!: number;
  progress!: number;
  jsonData = [
    {
      telefono: '',
      mensaje: '',
      dato: '',
      fechaEnvio: '',
      horaEnvio: '',
      correo: '',
    },
  ];

  constructor(
    private fileUploadService: FileUploadService,
    private papa: Papa,
    public tituloService: TitleService,
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private conexionServicio: ApiService,
    private csvService: CsvService
  ) {}

  ngOnInit(): void {
    this.tituloService.titulo$.next('Subir registros');
  }

  obtenerData(arr: any) {
    arr.forEach((element: any) => {
      console.log(element);
    });
  }

  convertirCsv(event: any) {
    const csv = event.target.files[0];
    const options = {
      skipEmptyLines: true,
      name: true,
      complete: (results: any, file: any) => {
        const resultado = [results];
        resultado.forEach((element: any) => {
          console.log(element);
          this.conexionServicio.agregarSms(element).subscribe(
            (respuesta) => {
              if (respuesta) {
                Swal.fire({
                  icon: 'success',
                  title: respuesta.mensaje,
                });
                this.archivos = [];
                this.inputArchivo = '';
              }
            },
            (err) => {
              Swal.fire({
                icon: 'error',
                title: err.mensaje,
              });
              this.archivos = [];
              this.inputArchivo = '';
            }
          );
        });
      },
    };
    this.papa.parse(csv, options);
  }

  incomingfile(event: any) {
    this.botonSubir = false;
    this.file = event.target.files[0];
  }

  Upload() {
    this.loading = true;
    this.botonSubir = false;
    let fileReader = new FileReader();
    fileReader.onload = (e) => {
      this.arrayBuffer = fileReader.result;
      var data = new Uint8Array(this.arrayBuffer);
      var arr = new Array();
      for (var i = 0; i != data.length; ++i)
        arr[i] = String.fromCharCode(data[i]);
      var bstr = arr.join('');
      var workbook = XLSX.read(bstr, {
        type: 'binary',
        cellDates: true,
        cellText: false,
      });
      var first_sheet_name = workbook.SheetNames[0];
      var worksheet = workbook.Sheets[first_sheet_name];
      var objetoDeXls: any[] = XLSX.utils.sheet_to_json(worksheet, {
        header: 0,
        defval:'',
        raw: false,
        dateNF: 'DD-MM-YYYY',
        
      });
      console.table(objetoDeXls);
      this.fileUploadService
        .upload({
          Action:     'UP',
          IdUser:     localStorage.getItem("IdUser"),
          IdCliente:  localStorage.getItem("IdCliente"),
          Data:       objetoDeXls,
        })
        .subscribe((resp: any) => {
          this.loading = false;
          let objectJson = JSON.parse(resp.datos[0].response);
          let titulo = objectJson.titulo;
          let L1 = objectJson.L1;
          let L2 = objectJson.L2;
          let L3 = objectJson.L3;
          let L4 = objectJson.L4;
          let L5 = objectJson.L5;
          this.loading = false;
          Swal.fire({
            width: 600,
            icon: resp.status,
            html: `
                      <h1><strong>${titulo}</strong></h1>
                      <h2><strong>${L1}</strong></h2>
                      <h2><strong>${L2}</strong></h2>
                      <h2><strong>${L3}</strong></h2>
                      <h2><strong>${L4}</strong></h2>
                      <h2><strong>${L5}</strong></h2>
                      `,
            showConfirmButton: true,
          });
        });
    };
    fileReader.readAsArrayBuffer(this.file);
  }

  capturarArchivo(event: any) {
    const archivo = event.target.files[0];
    this.archivos.push(archivo);
  }

  fileDownload() {
    this.csvService.downloadFile(this.jsonData, 'PlantillaSms');
  }

  subirArchivo() {
    try {
      const formularioDeDatos = new FormData();
      this.archivos.forEach((archivo) => {
        formularioDeDatos.append('archivo', archivo);
      });

      this.conexionServicio.subirArchivo(formularioDeDatos).subscribe(
        (respuesta) => {
          if (respuesta.type == HttpEventType.UploadProgress) {
            this.uploadProgress = Math.round(
              100 * (respuesta.loaded / respuesta.total)
            );
            Swal.fire({
              icon: 'success',
              title: respuesta.mensaje,
            });
            this.archivos = [];
            this.inputArchivo = '';
          }
        },
        (err) => {
          Swal.fire({
            icon: 'error',
            title: err.mensaje,
          });
          this.archivos = [];
          this.inputArchivo = '';
        }
      );
    } catch (error) {
      console.warn('ERROR', error);
    }
  }
}
