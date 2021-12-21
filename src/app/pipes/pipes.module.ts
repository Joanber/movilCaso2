import { NgModule } from '@angular/core';
import { FiltroPipe } from './filtro.pipe';
import { ConvocaPipe } from './convoca.pipe';



@NgModule({
  declarations: [FiltroPipe, ConvocaPipe],
  exports:[FiltroPipe],
  
})
export class PipesModule { }
