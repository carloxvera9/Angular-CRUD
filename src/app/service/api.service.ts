import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  postPais(data: any){
    return this.http.post<any>("http://localhost:3000/paisesList/",data);
  }
  getPais(){
    return this.http.get<any>("http://localhost:3000/paisesList/");
  }
  putPais(data: any, id:number){
    return this.http.put<any>("http://localhost:3000/paisesList/"+id,data);
  }
  deletePais(id:number){
    return this.http.delete<any>("http://localhost:3000/paisesList/"+id);
  }

}
