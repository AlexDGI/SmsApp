import {AfterViewInit, Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';

import {MatSort, Sort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {MatPaginator} from '@angular/material/paginator';

import {ApiService} from 'src/app/services/api.service';
import { FormularioComponent } from './formulario/formulario.component';
import { Clientes } from 'src/app/shared/models/clientes.model';
import Swal from 'sweetalert2';
import { TitleService } from 'src/app/services/title.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ELEMENT_DATA: Clientes[] = [];
 
  Columnas: string[] = ['Id', 'IdFiscal', 'RazonSocial', 'FirmaSms', 'NombreContacto', 'TlfContacto', 'EmailContacto', 'Estado', 'Acciones'];

  public clientes!: MatTableDataSource<Clientes>;

  public ventanaModificacion!: MatDialogRef<FormularioComponent>;


  data: any ='';

  dialogRef: any;

  showFiller = false;

  constructor(
    public tituloService: TitleService,
    private conexionServicio: ApiService,
    private matDialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.tituloService.titulo$.next("Clientes")
    this.recuperarClientes();
  }

  recuperarClientes() {

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
    this.conexionServicio.recuperarClientes().subscribe((result) =>{
      this.clientes = new MatTableDataSource(result);
      this.clientes.paginator = this.paginator;
      this.clientes.sort = this.sort;
      Swal.close();
    });
  };

  confirmacionBorrar(Id:any){
    Swal.fire({
      title: '¿Seguro que deseas eliminar este cliente?',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      denyButtonText: `No, Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('Cliente eliminado satisfactoriamente!', '', 'success');
        this.conexionServicio.eliminarCliente(Id).subscribe((datos:any) => {
          if (datos['resultado']=='OK') {
            this.recuperarClientes();
          }
        });;
      } else if (result.isDenied) {
        Swal.fire('Cancelado.', '', 'info')
      }
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.clientes.filter = filterValue.trim().toLowerCase();
    if (this.clientes.paginator) {
      this.clientes.paginator.firstPage();
    }
  }

  abrirVentanaCreacion(){
    this.ventanaModificacion = this.matDialog.open(FormularioComponent, {
      data:{
        action: "nuevo"
      },
      width: "50%",
      maxWidth: "60%",
    });
    this.ventanaModificacion.afterClosed().subscribe(result => {
      //console.log(result);
      this.recuperarClientes();
    })
    //console.log(NumLiquidacion);
  }
  

  abrirFormularioEditar(clientes: Clientes){
      this.ventanaModificacion = this.matDialog.open(FormularioComponent, {
        data: {
          clientes,
          action: "editar"
        },
        width: "50%",
        maxWidth: "60%",
      });
      this.ventanaModificacion.afterClosed().subscribe(result => {
        this.recuperarClientes();
      })
    }
}
