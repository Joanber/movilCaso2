import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ComponentsModule } from 'src/app/components/components.module';
import { AcreditacionPppPage } from './acreditacion-ppp.page';



const routes: Routes = [
  {
    path: '',
    component: AcreditacionPppPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),ComponentsModule
  ],
  declarations: [AcreditacionPppPage]
})
export class AcreditacionPppPageModule {}
