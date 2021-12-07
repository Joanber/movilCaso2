import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SharedService {
  // 'font- weight': 'bold', 'font-size': '18px'
  private status = new BehaviorSubject<object[]>([
    { style: { color: '#285D27', background: '#C8E1C2', 'border-radius': '8px' }, color: 'success', name: 'A tiempo' },
    { style: { color: '#8A5340', background: '#FEEDAF', 'border-radius': '8px' }, color: 'warning', name: 'Por cumplir el plazo' },
    { style: { color: '#C63737', background: '#FFCDD2', 'border-radius': '8px' }, color: 'danger', name: 'Fuera de tiempo' }
  ]);
  status$ = this.status.asObservable();
  constructor() {}
}
