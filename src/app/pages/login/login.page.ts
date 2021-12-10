import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController, MenuController, NavController } from '@ionic/angular';
import { AppComponent } from 'src/app/app.component';
import { Docente } from 'src/app/models/docente';
import { usuario } from 'src/app/models/usuario';
import { LoginService } from 'src/app/services/login.service';

import { UtilsService } from 'src/app/utils/utils.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  passwordType: string = 'password';
  passwordIcon: string = 'eye-off';
  dataUsuario: usuario[] = [];

  // constructor() { }

  public titulo: string = 'Login';
  // @Input() data: any;
  // @Input() events: any;
  public username: string;
  public password: string;
  public isUsernameValid: boolean;
  public isPasswordValid: boolean;
  longusuario: any = [];
  longdocente: any = [];
  longcoordinador: any = [];
  num: number = 0;
  UsuarioLoging: string;
  idUsuarioLogin: number;
  usuarios = [];
  constructor(
    private navCtrl: NavController,
    public service: LoginService,
    private utils: UtilsService,
    private router: Router,
    private alertController: AlertController,
    private menuCtrl: MenuController,
    private menu:AppComponent,
    public loadingController: LoadingController
  ) {
    // this.isUsernameValid = true;
    // this.isPasswordValid = true;
    // this.data = this.service.getDataForLoginFlat();
    // this.events = {
    //   onLogin: this.onLogin,
    // };
  }

  ngOnInit() {}

  
  ionViewWillEnter() {
    this.menuCtrl.enable(false);
    localStorage.clear();
    // this.menuCtrl.(false);
  }

  ionViewDidLeave(){
    this.menuCtrl.enable(true);
    // this.menuCtrl.swipeGesture(true);
  }

  onEvent() {
    // if (event == 'onLogin' && !this.validate()) {
    //   return;
    // }
    // if (this.events[event]) {
    //   this.events[event]({
    //     username: this.username,
    //     password: this.password,
    //   });
    // }
    this.consultaValidacionUserPasword();
  };

  validate(): boolean {
    this.isUsernameValid = true;
    this.isPasswordValid = true;
    if (!this.username || this.username.length == 0) {
      this.isUsernameValid = false;
    }
    if (!this.password || this.password.length == 0) {
      this.isPasswordValid = false;
    }
    return this.isPasswordValid && this.isUsernameValid;
  }
  validarUsuariosMultiples() {
    this.num = 0;
    if (this.longusuario != null) {
      const usuario = {
        tipo: 'Usuario',
        id: this.longusuario.codUsuario + '/Usuario',
      };
      this.UsuarioLoging = 'Usuario';
      this.idUsuarioLogin = Number(this.longusuario.codUsuario);
      this.num += 1;
      console.log(this.num);
      this.usuarios.push(usuario);
    }
    if(this.longdocente!=null){
      const usuario={
        'tipo':'Docente',
        'id': this.longdocente.codDocente+'/Tecnico'
      }
      this.UsuarioLoging="Docente";
      this.idUsuarioLogin=Number(this.longdocente.codDocente)
      this.num+=1;
      this.usuarios.push(usuario);
      console.log(this.num);
    }
    if(this.longcoordinador!=null){
      const usuario={
        'tipo':'Coordinador',
        'id': this.longcoordinador.codCoordinador+'/Coordinador'
      }
      this.UsuarioLoging="Coordinador";
      this.idUsuarioLogin=Number(this.longcoordinador.codCoordinador)
      this.num+=1;
      console.log(this.num)
      this.usuarios.push(usuario);
    }
    if (
      this.longdocente != null ||
      this.longcoordinador != null ||
      this.longusuario != null
    ) {
      this.AbirPag(this.UsuarioLoging, this.idUsuarioLogin);
    } else {
      this.utils.presentToastLenin('Credenciales Incorrectas');
    }
  }
  AbirPag(tipoUsuario, id) {
    if (this.num == 1) {
      localStorage.setItem("logued", "true");
      localStorage.setItem('userEditable', '1');
      console.log('registro de usuario editable habilitado');

      this.UsuarioLoging = tipoUsuario;
      this.idUsuarioLogin = Number(id);
      window.localStorage['idUsuario'] = this.idUsuarioLogin;
      window.localStorage['TipoUsuario'] = this.UsuarioLoging;
      this.presentLoading('Iniciando');
    }
    if (this.num == 2) {
      console.log(this.num);
      this.seleccionTipoCuenta2(this.usuarios);
    }
    if (this.num == 3) {
      console.log(this.num);
      this.seleccionTipoCuenta3(this.usuarios);
    }
  }
  consultaValidacionUserPasword() {
    this.usuarios = [];
    this.longusuario = [];
    this.longcoordinador = [];
    this.longdocente = [];
    this.service
      .loginUsuario(this.username, this.password)
      .then((data: usuario) => {
        console.log('Usuario', data);
        this.longusuario = data;
        this.service
          .loginTecnico(this.username, this.password)
          .then((data: Docente) => {
            console.log('Docente', data);
            this.longdocente = data;
            this.service
              .loginCoordinador(this.username, this.password)
              .then((data) => {
                console.log('coordinador', data);
                this.longcoordinador = data;
                this.validarUsuariosMultiples();
              });
          });
      });
  }
  async seleccionTipoCuenta2(usuario) {
    const alert = await this.alertController.create({
      header: 'Inicio de Sesion',
      subHeader: 'Iniciar como:',
      inputs: [
        {
          type: 'radio',
          label: usuario[0].tipo,
          value: usuario[0].id,
        },
        {
          type: 'radio',
          label: usuario[1].tipo,
          value: usuario[1].id,
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          handler: (data: any) => {},
        },
        {
          text: 'Ingresar',
          handler: (data: any) => {
            var arregloDeSubCadenas = data.split('/', 2);
            this.idUsuarioLogin = Number(arregloDeSubCadenas[0]);
            this.UsuarioLoging = arregloDeSubCadenas[1];
            localStorage.setItem("logued", "true");
            localStorage.setItem('userEditable', '1');
            console.log('registro de usuario editable habilitado');
            window.localStorage['idUsuario'] = this.idUsuarioLogin;
            window.localStorage['TipoUsuario'] = this.UsuarioLoging;
            this.presentLoading('Iniciando');
          },
        },
      ],
    });
    await alert.present();
  }
  async seleccionTipoCuenta3(usuario) {
    const alert = await this.alertController.create({
      header: 'Inicio de Sesion',
      subHeader: 'Iniciar como:',
      inputs: [
        {
          type: 'radio',
          label: usuario[0].tipo,
          value: usuario[0].id,
        },
        {
          type: 'radio',
          label: usuario[1].tipo,
          value: usuario[1].id,
        },
        {
          type: 'radio',
          label: usuario[2].tipo,
          value: usuario[2].id,
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: (data: any) => {},
        },
        {
          text: 'Ingresar',
          handler: (data: any) => {
            var arregloDeSubCadenas = data.split('/', 2);
            this.idUsuarioLogin = Number(arregloDeSubCadenas[0]);
            this.UsuarioLoging = arregloDeSubCadenas[1];
            localStorage.setItem("logued", "true");
            localStorage.setItem('userEditable', '1');
            console.log('registro de usuario editable habilitado');
            window.localStorage['idUsuario'] = this.idUsuarioLogin;
            window.localStorage['TipoUsuario'] = this.UsuarioLoging;
            this.presentLoading('Iniciando');
          },
        },
      ],
    });
    await alert.present();
  }

  // onLogin = (params): void => {
  //   this.utils.presentToastLenin('Login Now');
  // };

  hideShowPassword() {
    this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
    this.passwordIcon = this.passwordIcon === 'eye-off' ? 'eye' : 'eye-off';
  }

  irRegistrarse() {
    this.router.navigateByUrl('/registro');
  }
  AbrirTipoUsuario() {
    this.menu.cambio();
    if (this.UsuarioLoging == 'Coordinador') {
      // localStorage.setItem("userData", JSON.stringify(this.longcoordinador));
      this.navCtrl.navigateForward('lista-ticket-coordinador/Incidente');
    }
    if (this.UsuarioLoging == 'Usuario') {
      // localStorage.setItem("userData", JSON.stringify(this.longusuario));
      this.navCtrl.navigateForward('inicio');
    }
    if (this.UsuarioLoging == 'Tecnico') {
      // localStorage.setItem("userData", JSON.stringify(this.longtecnico));
      this.navCtrl.navigateForward('lista-tecnico');
    }
  }

  async presentLoading(msg: string){
    const loading = await this.loadingController.create({
      spinner: 'crescent',
      message: msg,
      translucent: true,
      cssClass: 'custom-class custom-loading'
    });
    loading.present();
    setTimeout(() => {
      this.AbrirTipoUsuario();
      loading.dismiss();
    }, 1500);
  }
}
