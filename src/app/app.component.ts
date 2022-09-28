import { Component, OnInit, ViewChild } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { ApiService } from './service/api.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort, Sort} from '@angular/material/sort';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'AngularCrud';
  displayedColumns: string[] = ['idpais', 'nompais', 'continente', 'fecha','Actions'];
  dataSource = new MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

 constructor(private dialog : MatDialog, private api :ApiService){

 }
  ngOnInit(): void {
    this.getallPaises();
  }
  openDialog() {
    this.dialog.open(DialogComponent, {
      width:'30%'
    }).afterClosed().subscribe(val=>{
      if(val== 'save'){
        this.getallPaises();
      }
    })
  }
  getallPaises(){
    this.api.getPais()
    .subscribe({
      next:(res)=>{
        this.dataSource= new MatTableDataSource(res);
        this.dataSource.paginator= this.paginator;
        this.dataSource.sort=this.sort
      },
      error:()=>{
        alert("Error al cargar los registros")
      }
    })
  }

  editPaises(row :any){
    this.dialog.open(DialogComponent,{
      width:'30%',
      data: row
    }).afterClosed().subscribe(val =>{
      if(val=='update'){
        this.getallPaises();
      }
    })
  }

  deletePaises(id:number){
    this.api.deletePais(id)
    .subscribe({
      next:(res)=>{
        alert("El pais fue eliminado correctamente");
        this.getallPaises();
      },
      error:()=>{
        alert("Error en eliminar el pais")
      }
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}



