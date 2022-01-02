import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AlertController, MenuController, Platform } from '@ionic/angular';
import { Observable } from 'rxjs';
import { Componente } from './interfaces/interfaces';
import { DataService } from './services/data.service';
import { UsuarioService } from './services/usuario.service';



@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {


  componentes:Observable<Componente[]>
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public usuarioService: UsuarioService,


 //componentes de menu
    private alertCrtl: AlertController,
    private router: Router,
    private dataS:DataService,private menu:MenuController
  ) {
    this.initializeApp();
  }

//cerrar session
logout() {
  this.usuarioService.logout();
  this.menu.enable(false);
  // this.router.navigate(["/login"]);
}

//inicializar menu
  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.statusBar.backgroundColorByHexString('#FFFFFF');
      this.splashScreen.hide();
      this.componentes=this.dataS.getMenuOpts()
    });

  }}