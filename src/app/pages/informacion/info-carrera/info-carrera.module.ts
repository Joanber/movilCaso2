import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { InfoCarreraPage } from './info-carrera.page';

const routes: Routes = [
  {
    path: '',
    component: InfoCarreraPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [InfoCarreraPage]
})
export class InfoCarreraPageModule {}
