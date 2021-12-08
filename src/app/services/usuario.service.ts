import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  url = "https://servi-desk.herokuapp.com/usuario/"
  // url = 'http://192.168.1.50:9898/usuario/';
  results: Observable<any>;

  constructor(private http: HttpClient) { }

  async createUsuario(usuario: usuario) {
    const headers = { "content-type": "application/json" };
    let body = {
      "email": usuario.email.toString(),
      "contrasena": usuario.contrasena.toString(),
      "persona": {
        "cedula": usuario.persona.cedula.toString()
      }
    } 
    return this.http
      .post(this.url+"crear", body, {
        headers: headers,
        observe: "response"
      })
      .toPromise();
  }

  async updateUsuario(usuario: usuario, codUsuario: number) {
    const headers = { "content-type": "application/json" };
    let body = {
      "codUsuario": codUsuario,
      "email": usuario.email.toString(),
      "contrasena": usuario.contrasena.toString()
    } 
    return this.http
      .put(this.url+"editar/"+codUsuario, body, {
        headers: headers,
        observe: "response"
      })
      .toPromise();
  }

  getUsuarioIdByEmail(email:String){
    return new Promise(resolve => {
      this.http.get(this.url+'buscar-email/'+email).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }

  getUserById(codUsuario:number) {
    return new Promise(resolve => {
      this.http.get(this.url+'buscar/'+codUsuario).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }
}
