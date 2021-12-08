import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AlertController, Platform } from '@ionic/angular';
import { Observable } from 'rxjs';
import { Componente } from './interfaces/interfaces';
import { DataService } from './services/data.service';
import { UtilsService } from './utils/utils.service';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {


  tipo: any;
  constructor(
    private utils: UtilsService,
    private platform: Platform,
    // private splashScreen: SplashScreen,
    // private statusBar: StatusBar,
    private alertCrtl: AlertController,
    private router: Router
  ) {
    localStorage.setItem('userEditable', '1');
    this.tipo = localStorage.getItem('TipoUsuario');
    console.log('Tipo: ' + this.tipo);
  }

  ngOnInit() {
    localStorage.setItem('userEditable', '1');
    this.tipo = localStorage.getItem('TipoUsuario');
    console.log('Tipo: ' + this.tipo);
  }

  cambio(){
    this.ngOnInit();
  }
  
  async cerrarSesion() {
    //  this.router.navigateByUrl('/home');
    const toast = await this.alertCrtl.create({
      header: 'Cerrar Sesion',
      message: '¿Esta seguro de que desea cerrar sesion?',
      //position: 'middle',
      buttons: [
        {
          text: 'Cancelar',
          role: 'no',
          cssClass: 'light',
          handler: () => {
            console.log('cancel clicked');
          },
        },
        {
          text: 'Salir',
          handler: () => {
            localStorage.clear();
            this.router.navigateByUrl('/login');
            console.log('leave clicked');
          },
        },
      ],
    });
    toast.present();
  }

}