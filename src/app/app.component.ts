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
  componentes:Observable<Componente[]>
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
      private utils: UtilsService,
 //componentes de menu
    private alertCrtl: AlertController,
    private router: Router,
    private dataS:DataService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.componentes=this.dataS.getMenuOpts()
    });
  


    // private splashScreen: SplashScreen,
    // private statusBar: StatusBar,
  

//componentes de login 
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
}
  