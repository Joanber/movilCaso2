import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Carrera } from '../models/carrera.model';
import { SolicitudEmpresa } from '../models/solicitudEmpresa.model';

const bd_url = environment.bd_url + "/carreras";

@Injectable({
  providedIn: 'root'
})
export class CarreraService {

  constructor(private http : HttpClient) { }
  //metod para listar todas las carreras y solicitudes
  getCarreras(): Observable<Carrera[]> {
//llamar endpoint
    return this.http.get<Carrera[]>(`${bd_url}/filtrar`);
  }
}
