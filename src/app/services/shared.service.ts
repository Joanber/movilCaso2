import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private status = new BehaviorSubject<any[]>([
    { style: 'color:#8A5340; background-color: #FEEDAF;', name: 'Por cumplir el plazo' },
    { style: 'color:#C63737; background-color: #FFCDD2;', name: 'Fuera de tiempo ' },
    { style: 'color:#256029; background-color: #C8E6C9;', name: 'A tiempo' },
  ]);
  status$ = this.status.asObservable();
  constructor() { }
}
