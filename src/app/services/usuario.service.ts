import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Rol } from '../models/rol.models';
import { Usuario } from '../models/usuario.model';
import { environment } from "src/environments/environment";
import Swal from "sweetalert2";
const bd_url = environment.bd_url;
@Injectable({
  providedIn: 'root'
})
export class UsuarioService {


  private _usuario: Usuario;
  private _token: string;
  constructor(private http: HttpClient, private router: Router) {}
  login(username: string, password: string): Observable<any> {
    return this.http.post(`${bd_url}/auth/login`, {
      username,
      password,
    });
  }


  
  public get usuario(): Usuario {
    if (this._usuario != null) {
      return this._usuario;
    } else if (
      this._usuario == null &&
      localStorage.getItem("usuario") != null
    ) {
      this._usuario = JSON.parse(localStorage.getItem("usuario")) as Usuario;
      return this._usuario;
    }
    return new Usuario();
  }

  public get token(): string {
    if (this._token != null) {
      return this._token;
    } else if (this._token == null && localStorage.getItem("token") != null) {
      this._token = localStorage.getItem("token");
      return this._token;
    }
    return null;
  }
  guardarToken(token: string): void {
    this._token = token;
    localStorage.setItem("token", token);
  }
  isAuthenticated(): boolean {
    if (this.token != null) {
      return true;
    }
    return false;
  }
  logout() {
    this._token = null;
    this._usuario = null;
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    this.router.navigateByUrl("login");
  }
  guardarUsuario(response: any): void {
    this._usuario = new Usuario();
    this._usuario.username = response.username;
    this.usuario.id = response.id;
    this.usuario.persona = response.persona;
    localStorage.setItem("usuario", JSON.stringify(this._usuario));
  }

  //OBTENER UN USUARIO POR ID
  getUsuarioById(id: number): Observable<Usuario> {
    return this.http.get<Usuario>(`${bd_url}/usuarios/${id}`);
  }

  //PAGINACION DE USUARIOS
  getUsuariosPage(
    page: string,
    size: string,
    busqueda: string
  ): Observable<any> {
    return this.http
      .get(
        `${bd_url}/usuarios/page?page=${page}&size=${size}&busqueda=${
          busqueda || ""
        } `
      )
      .pipe(
        tap((response: any) => {
          (response.content as Usuario[]).forEach((usuario) => {
            return usuario;
          });
        }),
        map((response: any) => {
          (response.content as Usuario[]).map((usuario) => {
            return usuario;
          });
          return response;
        })
      );
  }
  //CREAR USUARIO
  crear(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(`${bd_url}/usuarios/`, usuario).pipe(
      map((response: any) => response.usuario as Usuario),
      catchError((e) => {
        if (e.status == 400) {
          return throwError(e);
        }
        Swal.fire(e.error.mensaje, e.error.error, "error");
        return throwError(e);
      })
    );
  }
  //EDITAR USUARIO
  editar(usuario: Usuario, id: number): Observable<Usuario> {
    return this.http.put<Usuario>(`${bd_url}/usuarios/${id}`, usuario).pipe(
      map((response: any) => response.usuario as Usuario),
      catchError((e) => {
        if (e.status == 400) {
          return throwError(e);
        }
        Swal.fire(e.error.mensaje, e.error.error, "error");
        return throwError(e);
      })
    );
  }
  //EDITAR USUARIO CON LA CONTRASEÑA
  editarWithPassword(usuario: Usuario): Observable<Usuario> {
    return this.http
      .put<Usuario>(
        `${bd_url}/usuarios/withpass/${usuario.password}/${usuario.id}`,
        usuario
      )
      .pipe(
        map((response: any) => response.usuario as Usuario),
        catchError((e) => {
          if (e.status == 400) {
            return throwError(e);
          }
          Swal.fire(e.error.mensaje, e.error.error, "error");
          return throwError(e);
        })
      );
  }
  //ELIMINAR USUARIO
  eliminar(id: number): Observable<Usuario> {
    return this.http.delete<Usuario>(`${bd_url}/usuarios/${id}`).pipe(
      catchError((e) => {
        Swal.fire(e.error.mensaje, e.error.error, "error");
        return throwError(e);
      })
    );
  }
  //VALIDAR USERNAME EXISTENTE
  getUsernameExiste(username: string): Observable<Usuario> {
    return this.http.get<Usuario>(
      `${bd_url}/usuarios/existe-username-usuario/${username}`
    );
  }
  //OBTENER TODOS LOS ROLES
  getRoles(): Observable<Rol[]> {
    return this.http.get<Rol[]>(`${bd_url}/usuarios/roles`);
  }
}

