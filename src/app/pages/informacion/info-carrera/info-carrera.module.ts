import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ComponentsModule } from 'src/app/components/components.module';
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
    IonicModule, ReactiveFormsModule,
    RouterModule.forChild(routes), ComponentsModule
  ],
  declarations: [InfoCarreraPage]
})
export class InfoCarreraPageModule {}
