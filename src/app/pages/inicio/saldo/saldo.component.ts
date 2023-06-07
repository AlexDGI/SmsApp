import {AfterViewInit, Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';

import {MatSort, Sort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {MatPaginator} from '@angular/material/paginator';

import {ApiService} from 'src/app/services/api.service';
import Swal from 'sweetalert2';
import { TitleService } from 'src/app/services/title.service';
import { Envios } from 'src/app/shared/models/envios.model';
import { Recargas } from 'src/app/shared/models/recargas.model';
import { FormularioComponent } from './formulario/formulario.component';

@Component({
  selector: 'app-saldo',
  templateUrl: './saldo.component.html',
  styleUrls: ['./saldo.component.css']
})
export class SaldoComponent implements OnInit {

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  
  ELEMENT_DATA: Recargas[] = [];
 
  Columnas: string[] = ['Id', 'Fecha', 'IdFiscal', 'Forma', 'Referencia', 'FecTransaccion', 'Monto', 'Banco', 'Cuenta', 'FecVerificacion', 'UsrVerifico', 'CantidSms', 'Estado', 'Imagen', 'Acciones' ];

  public recargas!: MatTableDataSource<Recargas>;

  public ventanaModificacion!: MatDialogRef<FormularioComponent>;


  data: any ='';
  
  Id=0;

  dialogRef: any;

  showFiller = false;

  public datos:any[] = [];
  btnDesabilitado!: boolean;

  constructor(
    public tituloService: TitleService,
    private conexionServicio: ApiService,
    private matDialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.tituloService.titulo$.next("Historial de recargas");
    this.recuperarRegistros();
      this.conexionServicio.conect.subscribe(result => {
        if (result){
          this.recuperarRegistros();
        }
       });
  }

  recuperarRegistros() {
    
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

    this.conexionServicio.recuperarRecargas().subscribe((result) =>{
      Swal.close();
      this.datos = result;
      this.recargas = new MatTableDataSource(result);
      this.recargas.paginator = this.paginator;
      this.recargas.sort = this.sort;
      console.log(result);
    });
  };


  confirmacionBorrar(Id:any){
    Swal.fire({
      title: '¿Seguro que deseas eliminar esta recarga?',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      denyButtonText: `No, Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('Recarga eliminada satisfactoriamente!', '', 'success');
        this.conexionServicio.eliminarRecarga(Id).subscribe((datos:any) => {
          if (datos['resultado']=='OK') {
            this.recuperarRegistros();
          }
        });;
      } else if (result.isDenied) {
        Swal.fire('Cancelado.', '', 'info')
      }
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.recargas.filter = filterValue.trim().toLowerCase();

    if (this.recargas.paginator) {
      this.recargas.paginator.firstPage();
    }
  }

  salirDet(){
    this.Id = 0;
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
      console.log(result);
      this.recuperarRegistros();
      //console.log(result);
    })
   //console.log(NumLiquidacion);
  }
  
  aprobarRecarga(recargas: Recargas){
      Swal.fire({
        title: '¿Seguro que deseas aprobar esta recarga?',
        showCancelButton: true,
        confirmButtonText: 'Sí, aprobar',
        denyButtonText: `No, Cancelar`,
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire('Recarga aprovada satisfactoriamente!', '', 'success');
          this.conexionServicio.aprobarRecarga(recargas).subscribe((datos:any) => {
            if (datos['resultado']=='OK') {
              this.recuperarRegistros();
            }
          });;
        } else if (result.isDenied) {
          Swal.fire('Cancelado.', '', 'info')
        }
      })
  }

  abrirFormularioEditar(recarga: Recargas){
      this.ventanaModificacion = this.matDialog.open(FormularioComponent, {
        data: {
          recarga,
          action: "editar"
        },
        width: "50%",
        maxWidth: "60%",
      });
      this.ventanaModificacion.afterClosed().subscribe(result => {
        this.recuperarRegistros();
      })
    }
}
