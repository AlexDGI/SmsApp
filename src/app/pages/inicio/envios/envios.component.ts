import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';

import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';

import { ApiService } from 'src/app/services/api.service';
import Swal from 'sweetalert2';
import { TitleService } from 'src/app/services/title.service';
import { Envios } from 'src/app/shared/models/envios.model';
import { FormularioComponent } from './formulario/formulario.component';

@Component({
  selector: 'app-envios',
  templateUrl: './envios.component.html',
  styleUrls: ['./envios.component.css'],
})
export class EnviosComponent implements OnInit, AfterViewInit {
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  @Output() emitSaldo = new EventEmitter<any>();

  ELEMENT_DATA: Envios[] = [];

  Columnas: string[] = [
    'Id',
    'IdCliente',
    'Nombre',
    'Fecha',
    'Registros',
    'Estado',
    'Acciones',
  ];

  public envios!: MatTableDataSource<Envios>;

  public ventanaModificacion!: MatDialogRef<FormularioComponent>;

  data: any = '';

  Id = 0;

  dialogRef: any;

  showFiller = false;

  IdCliente = localStorage.getItem("IdCliente");

  public datos: any[] = [];
  saldo: any;

  constructor(
    public tituloService: TitleService,
    private conexionServicio: ApiService,
    private matDialog: MatDialog,
    private chang: ChangeDetectorRef
  ) {}
  ngAfterViewInit(): void {
    this.tituloService.titulo$.next('Maestro de envíos');
    this.chang.detectChanges();
  }

  ngOnInit(): void {
    this.recuperarEnvios();
  }

  ejecutarEvento(){
    this.emitSaldo.emit(this.saldo);
  }

  recuperarEnvios() {
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

    this.conexionServicio.recuperarEnvios().subscribe((result) => {
      this.datos = result;
      this.envios = new MatTableDataSource(result);
      this.envios.paginator = this.paginator;
      this.envios.sort = this.sort;
      Swal.close();
      this.mostrarSaldoSms();
    });
  }

  mostrarSaldoSms(){
    this.conexionServicio.recuperarSaldoSms(this.IdCliente).subscribe( (result:any) =>{
      this.saldo = result['saldo'];
      this.ejecutarEvento();
      Swal.fire({
        title: result['mensaje'],
      });
    })
 }


  confirmacionBorrar(Id: any) {
    Swal.fire({
      title: '¿Seguro que deseas eliminar este Envío?',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      denyButtonText: `No, Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('Envio eliminado satisfactoriamente!', '', 'success');
        this.conexionServicio.eliminarEnvio(Id).subscribe((datos: any) => {
          if (datos['resultado'] == 'OK') {
            this.recuperarEnvios();
          }
        });
      } else if (result.isDenied) {
        Swal.fire('Cancelado.', '', 'info');
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.envios.filter = filterValue.trim().toLowerCase();

    if (this.envios.paginator) {
      this.envios.paginator.firstPage();
    }
  }

  mostrarDet(IdCliente: any) {
    const arrData = this.datos.filter((arr) => arr.IdCliente == IdCliente);
    this.envios = new MatTableDataSource(arrData);
    this.envios.paginator = this.paginator;
    this.envios.sort = this.sort;
    this.Id = IdCliente;
    //console.log(IdCliente);
  }

  salirDet() {
    this.Id = 0;
  }

  abrirVentanaCreacion() {
    this.ventanaModificacion = this.matDialog.open(FormularioComponent, {
      data: {
        action: 'nuevo',
      },
      width: '50%',
      maxWidth: '60%',
    });
    this.ventanaModificacion.afterClosed().subscribe((result) => {
      console.log(result);
      this.recuperarEnvios();
    });
  }

  abrirFormularioEditar(envios: Envios) {
    this.ventanaModificacion = this.matDialog.open(FormularioComponent, {
      data: {
        envios,
        action: 'editar',
      },
      width: '50%',
      maxWidth: '60%',
    });
    this.ventanaModificacion.afterClosed().subscribe((result) => {
      console.log(result);
      this.recuperarEnvios();
    });
  }
}
