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
  componentes: Observable<Componente[]>;

  tipo: any;
  constructor(private splashScreen: SplashScreen,
              private statusBar: StatusBar,
              private utils: UtilsService,
              private platform: Platform,
              private alertCrtl: AlertController,
              private router: Router,
              private dataS: DataService) {
    localStorage.setItem('userEditable', '1');
    this.tipo = localStorage.getItem('TipoUsuario');
    console.log('Tipo: ' + this.tipo);
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.componentes = this.dataS.getMenuOpts();
    });
  }

  init() {
    localStorage.setItem('userEditable', '1');
    this.tipo = localStorage.getItem('TipoUsuario');
    console.log('Tipo: ' + this.tipo);
  }

  cambio() {
    this.init();
  }

  async cerrarSesion() {
    //  this.router.navigateByUrl('/home');
    const toast = await this.alertCrtl.create({
      header: 'Cerrar Sesion',
      message: '¿Esta seguro de que desea cerrar sesion?',
      // position: 'middle',
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
