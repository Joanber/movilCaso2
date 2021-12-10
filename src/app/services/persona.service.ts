import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Persona } from '../models/persona';
import { usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {

  
  url = "https://servi-desk.herokuapp.com/persona/"
  // url = "http://192.168.1.50:9898/persona/";

  constructor(private http: HttpClient) { }

  async createPersona(persona: Persona) {
    const headers = { "content-type": "application/json" };
    let body = {
      "cedula": persona.cedula.toString(),
      "nombres": persona.nombres.toString(),
      "telefono": persona.telefono.toString(),
      "direccion": persona.direccion.toString()
    }
    return this.http
      .post(this.url+"guardar", body, {
        headers: headers,
        observe: "response"
      })
      .toPromise();
  }

  async updatePersona(persona: Persona) {
    const headers = { 'content-type': 'application/json' };
    let body = {
      cedula: persona.cedula.toString(),
      nombres: persona.nombres.toString(),
      telefono: persona.telefono.toString(),
      direccion: persona.direccion.toString(),
    };
    console.log(
      'cedula enviandose para modificar: ' + persona.cedula.toString()
    );
    return this.http
      .put(this.url + 'editar/' + persona.cedula.toString(), body, {
        headers: headers,
        observe: 'response',
      })
      .toPromise();
  }
}

