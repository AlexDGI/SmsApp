import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';

import {MatSort, Sort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {MatPaginator} from '@angular/material/paginator';

import {ApiService} from 'src/app/services/api.service';
import Swal from 'sweetalert2';
import { Envios } from 'src/app/shared/models/envios.model';
import { Detalles } from '../../../../shared/models/enviosDet.model';
import { FormularioDetComponent } from './formulario-det/formulario-det.component';

@Component({
  selector: 'app-envios-det',
  templateUrl: './envios-det.component.html',
  styleUrls: ['./envios-det.component.css']
})
export class EnviosDetComponent implements OnInit {

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ELEMENT_DATA: Detalles[] = [];
 
  Columnas: string[] = ['Id', 'IdMae', 'Telefono', 'Mensaje', 'Dato1', 'Dato2', 'Estado', 'Acciones'];

  public detalles!: MatTableDataSource<Detalles>;

  public ventanaModificacion!: MatDialogRef<FormularioDetComponent>;

  @Input() Id: any;

  data: any ='';

  dialogRef: any;

  showFiller = false;

  public datos:any[] = [];

  constructor(
    private conexionServicio: ApiService,
    private matDialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.recuperarEnviosDet();
  }

  recuperarEnviosDet() {
    
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
    this.conexionServicio.recuperarEnviosDet(this.Id).subscribe((result) =>{
      this.datos = result;
      this.detalles = new MatTableDataSource(result);
      this.detalles.paginator = this.paginator;
      this.detalles.sort = this.sort;
      //console.log(result);
      Swal.close();
    });
  };

  confirmacionBorrar(Id:any){
    Swal.fire({
      title: '¿Seguro que deseas eliminar este Envío?',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      denyButtonText: `No, Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('Envio eliminado satisfactoriamente!', '', 'success');
        this.conexionServicio.eliminarDetalle(Id).subscribe((datos:any) => {
          if (datos['resultado']=='OK') {
            this.recuperarEnviosDet();
          }
        });;
      } else if (result.isDenied) {
        Swal.fire('Cancelado.', '', 'info')
      }
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.detalles.filter = filterValue.trim().toLowerCase();

    if (this.detalles.paginator) {
      this.detalles.paginator.firstPage();
    }
  }

  abrirVentanaCreacion(){
    this.ventanaModificacion = this.matDialog.open(FormularioDetComponent, {
      data:{
        Id: this.Id,
        action: "nuevo"
      },
      width: "50%",
      maxWidth: "60%",
    });
    this.ventanaModificacion.afterClosed().subscribe(result => {
      //console.log(result);
      this.recuperarEnviosDet();
    })
  }
  

  abrirFormularioEditar(envios: Envios){
      this.ventanaModificacion = this.matDialog.open(FormularioDetComponent, {
        data: {
          envios,
          action: "editar"
        },
        width: "50%",
        maxWidth: "60%",
      });
      this.ventanaModificacion.afterClosed().subscribe(result => {
        this.recuperarEnviosDet();
      })
    }

}
