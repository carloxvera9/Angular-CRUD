import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { ApiService } from '../service/api.service';
import {MatDialogRef , MAT_DIALOG_DATA} from '@angular/material/dialog'
import { DialogRef } from '@angular/cdk/dialog';


@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
  paisesForm !: FormGroup;
  actionBtn : string ="save"

  constructor(private formBuilder: FormBuilder, 
    private api: ApiService,
    @Inject(MAT_DIALOG_DATA) public editData : any,
    private dialogred:MatDialogRef<DialogComponent>) { }

  ngOnInit(): void {
    this.paisesForm= this.formBuilder.group({
      idpais: ["",Validators.required],
      nompais: ["",Validators.required],
      continente: ["",Validators.required],
      fecha: ["",Validators.required],
    });

    if(this.editData){
      this.actionBtn="update"
      this.paisesForm.controls['idpais'].setValue(this.editData.idpais);
      this.paisesForm.controls['nompais'].setValue(this.editData.nompais);
      this.paisesForm.controls['continente'].setValue(this.editData.continente);
      this.paisesForm.controls['fecha'].setValue(this.editData.fecha);
   
    }
  }
  addPais(){
  if(!this.editData){
    if(this.paisesForm.valid){
      this.api.postPais(this.paisesForm.value)
      .subscribe({
        next:(res)=>{
          alert("El pais ha sido registrado correctamente")
          this.paisesForm.reset();
          this.dialogred.close('save');

        },
        error:()=>{
          alert("Error al registrar")
        }
      })
    }
  }else{
    this.updatePaises()
  }
 }

 updatePaises(){
  this.api.putPais(this.paisesForm.value,this.editData.id)
  .subscribe({
    next:(res)=>{
      alert("Pais actualizado correctamente");
      this.paisesForm.reset();
      this.dialogred.close('update');
    },
    error:()=>{
      alert("Error en actualizar el pais")
    }
  })
}
}
