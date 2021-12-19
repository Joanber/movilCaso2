import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Convocatoria } from '../models/convocatoria.model';
const bd_url = environment.bd_url + "/convocatoria";

@Injectable({
  providedIn: 'root'
})
export class ConvocatoriaService {

  constructor(private http: HttpClient) { }
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Headers': 'Content-Type', 'Access-Control-Allow-Methods': 'GET', 'Access-Control-Allow-Origin' : '*' })

 };
  getConvocatoriasPage(): Observable<Convocatoria[]> {

    return this.http.get<Convocatoria[]>(`${bd_url}/filtrar`, this.httpOptions
    );

  }

}
