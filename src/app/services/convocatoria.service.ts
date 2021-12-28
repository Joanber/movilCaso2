import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Carrera } from "../models/carrera.model";
import { Convocatoria } from "../models/convocatoria.model";
import { SolicitudEmpresa } from "../models/solicitudEmpresa.model";
const bd_url = environment.bd_url + "/convocatorias";

const bd_ur = environment.bd_url + "/carreras";

@Injectable({
  providedIn: "root",
})
export class ConvocatoriaService {
  constructor(private http: HttpClient) {}

  getConvocatorias(): Observable<Convocatoria[]> {
    return this.http.get<Convocatoria[]>(`${bd_url}/filtrar`);
  }
  //OBTENER UNA CONVOCATORIA POR ID
  getConvocatoriaById(id: number): Observable<Convocatoria> {
    return this.http.get<Convocatoria>(`${bd_url}/${id}`);
  }
  
}
