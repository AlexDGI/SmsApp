import {AfterViewInit, Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';

import {MatSort, Sort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {MatPaginator} from '@angular/material/paginator';

import {ApiService} from 'src/app/services/api.service';
import { FormularioComponent } from './formulario/formulario.component';
import { Definiciones } from 'src/app/shared/models/definiciones.model';
import Swal from 'sweetalert2';
import { TitleService } from 'src/app/services/title.service';



@Component({
  selector: 'app-definiciones',
  templateUrl: './definiciones.component.html',
  styleUrls: ['./definiciones.component.css']
})
export class DefinicionesComponent implements OnInit {
  
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ELEMENT_DATA: Definiciones[] = [];
 
  Columnas: string[] = ['Id', 'Nombre', 'Siglas', 'Valor', 'Acciones'];

  public definiciones!: MatTableDataSource<Definiciones>;

  public ventanaModificacion!: MatDialogRef<FormularioComponent>;


  data: any ='';

  dialogRef: any;

  showFiller = false;
  btnDesabilitado!: boolean;

  constructor(
    public tituloService: TitleService,
    private conexionServicio: ApiService,
    private matDialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.tituloService.titulo$.next("Definiciones")
    this.recuperarDefiniciones();
      this.conexionServicio.conect.subscribe(result => {
        if (result){
          this.recuperarDefiniciones();
        }
       });
  }

  recuperarDefiniciones() {
    
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

    this.conexionServicio.recuperarDefiniciones().subscribe((result) =>{
      Swal.close();
      this.definiciones = new MatTableDataSource(result);
      this.definiciones.paginator = this.paginator;
      this.definiciones.sort = this.sort;
      console.log(result);
    });
  };

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.definiciones.filter = filterValue.trim().toLowerCase();

    if (this.definiciones.paginator) {
      this.definiciones.paginator.firstPage();
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
      console.log(result);
      this.recuperarDefiniciones();
      //console.log(result);
    })
    //console.log(NumLiquidacion);
  }
  

  abrirFormularioEditar(definiciones: Definiciones){
      this.ventanaModificacion = this.matDialog.open(FormularioComponent, {
        data: {
          definiciones,
          action: "editar"
        },
        width: "50%",
        maxWidth: "60%",
      });
      this.ventanaModificacion.afterClosed().subscribe(result => {
        this.recuperarDefiniciones();
      })
    }
}
