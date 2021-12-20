import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Convocatoria } from "../models/convocatoria.model";
const bd_url = environment.bd_url + "/convocatorias";

@Injectable({
  providedIn: "root",
})
export class ConvocatoriaService {
  constructor(private http: HttpClient) {}

  getConvocatorias(): Observable<Convocatoria[]> {
    return this.http.get<Convocatoria[]>(`${bd_url}/filtrar`);
  }
}
