import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { Platform } from '@ionic/angular';
import { BehaviorSubject, Observable } from 'rxjs';
import { Usuario } from './../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  private database: SQLiteObject;
  private dbReady = new BehaviorSubject<boolean>(false);
  usuarios = new BehaviorSubject([]);

  constructor(
    private plt: Platform,
    private sqlitePorter: SQLitePorter,
    private sqlite: SQLite,
    private http: HttpClient) {

    this.plt.ready().then(() => {
      if (this.plt.is('android')) {
        this.sqlite.create({
          name: 'movil.db',
          location: 'default'
        })
          .then((db: SQLiteObject) => {
            this.database = db;
            this.seedDatabase();
          });
      }
    });

  }

  seedDatabase() {
    this.http.get('assets/Users.sql', { responseType: 'text' })
      .subscribe(sql => {
        this.sqlitePorter.importSqlToDb(this.database, sql)
          .then(_ => {

            this.loadUsuarios();
            this.dbReady.next(true);
          })
          .catch(e => console.error(e));
      });
  }

  getDatabaseState() {
    return this.dbReady.asObservable();
  }

  getUsuarios(): Observable<any[]> {
    return this.usuarios.asObservable();
  }



  async loadUsuarios() {
    let query = 'SELECT * from usuario';
    const data = await this.database.executeSql(query, []);
    let usuarios = [];
    if (data.rows.length > 0) {
      for (var i = 0; i < data.rows.length; i++) {
        usuarios.push({
          codUsuario: data.rows.item(i).codUsuario,
          email: data.rows.item(i).email,
          contrasena: data.rows.item(i).contrasena,
          cedula: data.rows.item(i).cedula,
        });
      }
      console.log(usuarios);
    }
    this.usuarios.next(usuarios);
  }



  async addUsuarios(usuarios: Usuario) {
    console.log("datos recividos en database service" + JSON.stringify(usuarios));
    const data = this.database.executeSql("INSERT INTO usuario (email, cedula, contrasena) VALUES (?, ?, ?)",
      [usuarios.username, usuarios.persona.identificacion, usuarios.password]);
    this.loadUsuarios();
  }

  async updateUsuarios(usuarios: Usuario) {
    let data = [usuarios.username, usuarios.password, usuarios.persona.identificacion];
    "UPDATE usuario SET email=?, contrasena=?, WHERE cedula=?"
    const data_1 = await this.database.executeSql(`UPDATE usuario SET email=?, contrasena=? WHERE cedula =?`, data);
    this.loadUsuarios();
  }

}