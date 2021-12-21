import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'convoca'
})
export class ConvocaPipe implements PipeTransform {
   transform(arreglo: any[], texto: string, data:string): any[] {
  if(texto===''){
    return arreglo;
  }

  console.log(texto);
  console.log(data);
  
  texto=texto.toString().toLowerCase().trim();
  if(data=="abreviatura"){
    return arreglo.filter(item=>{
      return item.carrera.abreviatura.toLowerCase().trim().includes(texto);
   })
  } 
  
  if(data=="fecha_max_recib_solic"){
    return arreglo.filter(item=>{
      return item.fecha_max_recib_solic.split('T')[0].includes(texto);
   })

}


}}