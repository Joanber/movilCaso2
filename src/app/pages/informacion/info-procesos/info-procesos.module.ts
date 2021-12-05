import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { InfoProcesosPage } from './info-procesos.page';

const routes: Routes = [
  {
    path: '',
    component: InfoProcesosPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [InfoProcesosPage]
})
export class InfoProcesosPageModule {}
