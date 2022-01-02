import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { Platform } from '@ionic/angular';
import { BehaviorSubject, Observable } from 'rxjs';


export interface Anexo {
  id: number;
  nombre: string;
  url: string;
}
@Injectable({
  providedIn: 'root'
})
export class AnexoService {
  private storage: SQLiteObject;
  anexosList = new BehaviorSubject([]);
  private isDbReady: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(
    private platform: Platform,
    private sqlite: SQLite,
    private httpClient: HttpClient,
    private sqlPorter: SQLitePorter,
  ) {

    //creacion de la base sqlite
    this.platform.ready().then(() => {
      console.log('Plataforma', this.platform.platforms());
      if (this.platform.is('android')) {
        this.sqlite.create({
          name: 'base.db',
          location: 'default'
        })
          .then((db: SQLiteObject) => {
            this.storage = db;
            this.getFakeData();
          });
      }
    });
  }

  dbState() {
    return this.isDbReady.asObservable();
  }

  fetchAnexo(): Observable<Anexo[]> {
    return this.anexosList.asObservable();
  }

  // leer desde archivo sql 
  getFakeData() {
    this.httpClient.get('assets/Init.sql',
      { responseType: 'text' }
    ).subscribe(data => {
      this.sqlPorter.importSqlToDb(this.storage, data)
        .then(_ => {
          this.getAnexos();
          this.isDbReady.next(true);
          console.log()
        })
        .catch(error => console.error(error));
    });
  }

  // traer todo los datos almacenados
  getAnexos() {
    return this.storage.executeSql('SELECT * FROM Anexo', []).then(res => {
      const items: Anexo[] = [];
      if (res.rows.length > 0) {
        for (let i = 0; i < res.rows.length; i++) {
          items.push({
            id: res.rows.item(i).id,
            nombre: res.rows.item(i).nombre,
            url: res.rows.item(i).url
          });
        }
      }
     
      this.anexosList.next(items);
      console.log(items);
    });
  }

  // añadir nuevo
  addAnexo(nombre, url) {
    const data = [nombre, url];
    return this.storage.executeSql('INSERT INTO Anexo(nombre, url) VALUES (?,?)', data)
      .then(res => {
        this.getAnexos();
      });
  }

  // llamar por id
  getAnexo(id): Promise<Anexo> {
    return this.storage.executeSql('SELECT * FROM Anexo WHERE id = ?', [id]).then(res => {
      return {
        id: res.rows.item(0).id,
        nombre: res.rows.item(0).nombre,
        url: res.rows.item(0).url
      };
    });
  }

  

  // Delete
  deleteAnexo(id) {
    return this.storage.executeSql('DELETE FROM Anexo WHERE id = ?', [id])
      .then(_ => {
        this.getAnexos();
      });
  }
}
