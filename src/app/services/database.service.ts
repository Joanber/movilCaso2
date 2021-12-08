import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';
import { SQLiteObject,SQLite } from '@ionic-native/sqlite/ngx';
import { Platform } from '@ionic/angular';
import { BehaviorSubject, Observable } from 'rxjs';
import { usuario } from '../models/usuario';

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
      private http: HttpClient)
       {

    this.plt.ready().then(() => {
      this.sqlite.create({
        name: 'movil',
        location: 'default'
      })
      .then((db: SQLiteObject) => {
          this.database = db;
          this.seedDatabase();
      });
    });
    
  }

  seedDatabase() {
    this.http.get('assets/seed.sql', { responseType: 'text'})
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

  

  async addUsuarios(usuarios: usuario) {
  console.log("datos recividos en database service" + JSON.stringify(usuarios));
  const data = this.database.executeSql("INSERT INTO usuario (email, cedula, contrasena) VALUES (?, ?, ?)",
    [usuarios.email, usuarios.persona.cedula, usuarios.contrasena]);
  this.loadUsuarios();
}

  async updateUsuarios(usuarios: usuario) {
  let data = [usuarios.email, usuarios.contrasena, usuarios.persona.cedula];
  "UPDATE usuario SET email=?, contrasena=?, WHERE cedula=?"
  const data_1 = await this.database.executeSql(`UPDATE usuario SET email=?, contrasena=? WHERE cedula =?`, data);
  this.loadUsuarios();
}

}