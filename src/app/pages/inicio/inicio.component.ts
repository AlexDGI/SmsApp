import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
  ChangeDetectionStrategy,
  AfterViewInit,
} from '@angular/core';

import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

import { ApiService } from 'src/app/services/api.service';
import { MatPaginator } from '@angular/material/paginator';
import { TitleService } from 'src/app/services/title.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css'],
})
export class InicioComponent implements OnInit, AfterViewInit {
  @Output() newItemEvent = new EventEmitter<string>();

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  x = '';
  dato: any;
  saldo: any;
  IdCliente = localStorage.getItem("IdCliente");

  constructor(
    private cdRef: ChangeDetectorRef,
    public tituloService: TitleService,
    private matDialog: MatDialog,
    private chang: ChangeDetectorRef,
    private conexionServicio: ApiService
  ) {
    
  }

  getSaldo(e: any){
    console.log(e);
  }
  ngOnInit() {
    this.retornarCliente();
    
  }



  mostrarSaldoSms(){
    this.conexionServicio.recuperarSaldoSms(this.IdCliente).subscribe( (result:any) =>{
      //this.getSaldo(event);
      console.log(result);
     this.saldo = result['saldo'];
    })
 }

  recuperarDefiniciones() {
    this.conexionServicio.recuperarDefiniciones().subscribe((result) => {
      //console.log(result[78].Valor);
    });
  }
  retornarCliente() {
    this.conexionServicio.recuperarClientes().subscribe((result: any) => {
      console.log(result);
      localStorage.setItem('IdCliente', result[0]['Id']);
    });
  }

  ngAfterViewInit() {
    //Promise.resolve().then( ()=>{
    //this.tituloService.titulo$.subscribe(titulo => {this.x = titulo});
    //})
    this.chang.detectChanges();
  }
}
