import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { UtilsService } from './../utils/utils.service';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient, private toast:UtilsService) { }
    // url = 'http://localhost:9898';
    // url = 'http://192.168.1.50:9898';
  url = "https://servi-desk.herokuapp.com"

  loginTecnico(email:string,contrasena:string){
    return new Promise(resolve => {
      this.http.get(this.url+'/tecnico/login/'+email+'/'+contrasena).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }
  loginUsuario(email:string,contrasena:string){
    return new Promise(resolve => {
      this.http.get(this.url+'/usuario/login/'+email+'/'+contrasena).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }
  loginCoordinador(email:string,contrasena:string){
    return new Promise(resolve => {
      this.http.get(this.url+'/coordinador/login/'+email+'/'+contrasena).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }
}
