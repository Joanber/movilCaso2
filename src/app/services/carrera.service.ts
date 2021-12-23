import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SolicitudEmpresa } from '../models/solicitudEmpresa.model';

const bd_url = environment.bd_url + "/solicitudes_empresas";

@Injectable({
  providedIn: 'root'
})
export class CarreraService {

  constructor(private http : HttpClient) { }
  
  getCarreras(): Observable<SolicitudEmpresa[]> {

    return this.http.get<SolicitudEmpresa[]>(`${bd_url}/filtrar`);
  }
}
