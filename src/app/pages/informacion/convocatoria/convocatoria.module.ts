import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ConvocatoriaPage } from './convocatoria.page';
import { ComponentsModule } from 'src/app/components/components.module';

import { PipesModule } from 'src/app/pipes/pipes.module';

const routes: Routes = [
  {
    path: '',
    component: ConvocatoriaPage
  }
];

@NgModule({
 
  imports: [
    PipesModule,
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),ComponentsModule
  ],
  declarations: [ConvocatoriaPage]
  
})
export class ConvocatoriaPageModule {}
