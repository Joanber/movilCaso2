import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-convocatoria',
  templateUrl: './convocatoria.page.html',
  styleUrls: ['./convocatoria.page.scss'],
})
export class ConvocatoriaPage implements OnInit {
  private ListUser : any;  
  private todo: FormGroup;

  constructor(
  ){}
  ngOnInit(): void {
   
  }
}
