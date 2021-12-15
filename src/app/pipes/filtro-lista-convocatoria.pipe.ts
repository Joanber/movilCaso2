import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroListaConvocatoria'
})
export class FiltroListaEstadoTicketsPipe implements PipeTransform {

  transform(arreglo: any[], texto: string, data:string): any[] {
    if(texto===''){
      return arreglo;
    }

    console.log(texto);
    console.log(data);
    
    texto=texto.toString().toLowerCase().trim();
    if(data=="codConvoca"){
      return arreglo.filter(item=>{
        return item.codticket.toString().includes(texto) ;
     })
    } 
    if(data=="Categoria"){
      return arreglo.filter(item=>{
        return item.servicio.catalogo.categoria.toLowerCase().trim().includes(texto)  ;
     })
    }
    if(data=="Servicio"){
      return arreglo.filter(item=>{
        return item.servicio.titulo.toLowerCase().trim().includes(texto) ;
     })
    }
    if(data=="Fecha"){
      return arreglo.filter(item=>{
        return item.fechaCreacion.split('T')[0].includes(texto);
     })
    }
    if(data=="Estado"){
      return arreglo.filter(item=>{
        return  item.estado.nombreEstado.toLowerCase().trim().includes(texto) ;
     })
    }
  }


}
