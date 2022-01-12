import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Carrera } from '../models/carrera.model';
import { ResponsablePPP } from '../models/responsablePPP.model';
import { SolicitudEmpresa } from '../models/solicitudEmpresa.model';

const bd_url = environment.bd_url + "/responsablesPPP";

@Injectable({
  providedIn: 'root'
})
export class CarreraService {

  constructor(private http : HttpClient) { }
  //metod para listar todas las carreras y solicitudes
  getCarreras(): Observable<ResponsablePPP[]> {
//llamar endpoint
    return this.http.get<ResponsablePPP[]>(`${bd_url}/filtrar`);
  }
}
