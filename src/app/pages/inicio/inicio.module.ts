import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { InicioPage } from './inicio.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { PopinfoComponent } from 'src/app/components/popinfo/popinfo.component';

const routes: Routes = [
  {
    path: '',
    component: InicioPage
  }
];

@NgModule({
  entryComponents: [PopinfoComponent],
  imports: [   
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),ComponentsModule
  ],
  declarations: [InicioPage]
})
export class InicioPageModule {}
