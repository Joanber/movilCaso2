import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { Platform } from '@ionic/angular';
import { BehaviorSubject, Observable } from 'rxjs';


export interface Carrera {
  id: number;
  nombre: string;
  coor: string;
  ppp: string;
}

@Injectable({
  providedIn: 'root'
})
export class InfocarreraService {
  private storage: SQLiteObject;
  carrerasList = new BehaviorSubject([]);
  private isDbReady: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(
    private platform: Platform,
    private sqlite: SQLite,
    private httpClient: HttpClient,
    private sqlPorter: SQLitePorter,
  ) {
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

  fetchCarreras(): Observable<Carrera[]> {
    return this.carrerasList.asObservable();
  }

  // Render fake data
  getFakeData() {
    this.httpClient.get('assets/Init.sql',
      { responseType: 'text' }
    ).subscribe(data => {
      this.sqlPorter.importSqlToDb(this.storage, data)
        .then(_ => {
          this.getCarreras();
          this.isDbReady.next(true);
        })
        .catch(error => console.error(error));
    });
  }

  // Get list
  getCarreras() {
    return this.storage.executeSql('SELECT * FROM Carrera', []).then(res => {
      const items: Carrera[] = [];
      if (res.rows.length > 0) {
        for (let i = 0; i < res.rows.length; i++) {
          items.push({
            id: res.rows.item(i).id,
            nombre: res.rows.item(i).nombre,
            coor: res.rows.item(i).coor,
            ppp: res.rows.item(i).ppp
          });
        }
      }
      this.carrerasList.next(items);
    });
  }

  // Add
  addCarrera(nombre, coor, ppp) {
    const data = [nombre, coor, ppp];
    return this.storage.executeSql('INSERT INTO Carrera(nombre, coor, ppp) VALUES (?,?,?)', data)
      .then(res => {
        this.getCarreras();
      });
  }

  // Get single object
  getCarrera(id): Promise<Carrera> {
    return this.storage.executeSql('SELECT * FROM Carrera WHERE id = ?', [id]).then(res => {
      return {
        id: res.rows.item(0).id,
        nombre: res.rows.item(0).nombre,
        coor: res.rows.item(0).coor,
        ppp: res.rows.item(0).ppp
      };
    });
  }

  // Update
  updateCarrera(id, carrera: Carrera) {
    const data = [carrera.nombre, carrera.coor, carrera.ppp];
    return this.storage.executeSql(`UPDATE Carrera SET nombre = ?, coor = ?, ppp = ? WHERE id = ${ id }`, data)
      .then(() => {
        this.getCarreras();
      });
  }

  // Delete
  deleteCarrera(id) {
    return this.storage.executeSql('DELETE FROM Carrera WHERE id = ?', [id])
      .then(_ => {
        this.getCarreras();
      });
  }
}
