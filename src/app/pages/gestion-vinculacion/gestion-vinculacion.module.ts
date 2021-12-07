import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ComponentsModule } from 'src/app/components/components.module';
import { GestionVinculacionPage } from './gestion-vinculacion.page';



const routes: Routes = [
  {
    path: '',
    component: GestionVinculacionPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),ComponentsModule
  ],
  declarations: [GestionVinculacionPage]
})
export class GestionVinculacionPageModule {}
