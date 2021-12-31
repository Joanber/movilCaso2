import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';
import { Platform } from '@ionic/angular';
import { BehaviorSubject, Observable } from 'rxjs';
import { delay } from "rxjs/operators";
import { Componente } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private http:HttpClient) { }



  
  getUsers(){
    return this.http.get('https://jsonplaceholder.typicode.com/users')
  }
  getMenuOpts(){

    return this.http.get<Componente[]>('/assets/data/menu.json')
  }
  getAlbumes(){

    return this.http.get<any[]>('https://jsonplaceholder.typicode.com/albums')
  }
  getHeroes(){

    return this.http.get('/assets/data/superheroes.json').pipe(delay(2000))
  }

}