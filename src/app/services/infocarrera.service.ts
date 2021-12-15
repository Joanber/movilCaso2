import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';
import { Platform } from '@ionic/angular';
import { BehaviorSubject, Observable } from 'rxjs';


export interface Carrera {
  caId: number;
  name: string;
  coor: string;
  ppp: string;
}

@Injectable({
  providedIn: 'root'
})
export class InfocarreraService {

private database: SQLiteObject;
  private dbReady: BehaviorSubject <boolean> =new BehaviorSubject(false);
carreras= new BehaviorSubject([]);

  constructor(
    private plt: Platform, private sqlitePorter: SQLitePorter, private sqlite: SQLite, private http: HttpClient) {
   this.plt.ready().then(() =>{

      this.sqlite.create({
name:"base.db",
 location: "default" })
 .then((db: SQLiteObject) => {
        this.database = db;
        this.seedDatabase();
 });
});
    }


seedDatabase(){
  this.http.get('assets/seed.sql', {responseType: 'text'})
  .subscribe(sql => {
this.sqlitePorter.importSqlToDb(this.database, sql)
.then(_=> {
  this.loadCarreras();
  this.dbReady.next(true);

})
.catch(e => console.error(e));

  });
}

getDatabaseState(){
  return this.dbReady.asObservable();
}
getCarreras():Observable<Carrera[]>{
  return this.carreras.asObservable();
}
loadCarreras(){
  return this.database.executeSql('SELECT * FROM Carrera',[]).then(data =>{
    let carreras: Carrera[]= [];
    if ( data.rows.length > 0){

      for (let i =0; i< data.rows.length; i++){

        carreras.push ({
          caId:data.rows.item(i).caId,
name:data.rows.item(i).name,
 coor:data.rows.item(i).coor,
 ppp:data.rows.item(i).ppp
        });
      }
    }

    this.carreras.next(carreras);
  });
}
addCarreraData(studName, studClass, studMark) {
  let data = [studName, studClass, studMark];
  return this.database.executeSql('INSERT INTO Carrera (name, coor, ppp) VALUES (?, ?, ?)', data).then(data => {
    this.loadCarreras();
  });
}
getCarreraById(id): Promise<Carrera> {
  return this.database.executeSql('SELECT * FROM Carrera WHERE caId = ?', [id]).then(data => {
    return {
      caId: data.rows.item(0).caId,
      name: data.rows.item(0).name,
      coor: data.rows.item(0).coor,
      ppp: data.rows.item(0).ppp
    };
  });
}

updateCarrera(carrera: Carrera) {
  let data = [carrera.name, carrera.coor, carrera.ppp];
  return this.database.executeSql(`UPDATE Students SET name = ?, class = ?, mark = ? WHERE studId = ${carrera.caId}`, data).then(data => {
    this.loadCarreras();
  });
}
deleteCarrera(caId) {
  console.log('Inside Deleting DB Student Id '+ caId);
  return this.database.executeSql('DELETE FROM Students WHERE studId = ?', [caId]).then(_ => {
    this.loadCarreras();
  });
}
}
