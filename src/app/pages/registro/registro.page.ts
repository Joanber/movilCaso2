import { Component, OnInit } from '@angular/core';
import { Persona } from 'src/app/models/persona';
import { usuario } from 'src/app/models/usuario';

import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { DatabaseService } from 'src/app/services/database.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { PersonaService } from 'src/app/services/persona.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { UtilsService } from 'src/app/utils/utils.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
  // cedula: number;
  cedula: string;
  nombres: string;
  direccion: string;
  telefono: string;
  email: string;
  contrasena: string;
  sendMsg: any = '';
  usuarioUpdate: any = [];
  usuarios: any = [];
  tomarvalor = 0;

  dataPersona: Persona;
  dataUsuario: usuario;

  public titulo: string = 'Registro';
  passwordType: string = 'password';
  passwordIcon: string = 'eye-off';

  //ng variables
  editable: any;
  codUsuario: any;
  todo: FormGroup;

  constructor(
    private personaService: PersonaService,
    private usuarioService: UsuarioService,
    private utils: UtilsService,
    public formBuilder: FormBuilder,
    private db: DatabaseService,
    private router: Router
  ) {
    this.todo = this.formBuilder.group({
      cedula: new FormControl('', Validators.compose([Validators.required])),
      nombres: new FormControl('', Validators.compose([Validators.required])),
      telefono: new FormControl('', Validators.compose([Validators.required])),
      direccion: new FormControl('', Validators.compose([Validators.required])),
      email: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'),
        ])
      ),
      lastnombre: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(8),
        ])
      ),
      identification: new FormControl(
        '',
        Validators.compose([Validators.required])
      ),
    });
  }

  async ngOnInit() {
    this.editable = localStorage.getItem('userEditable');
    console.log('el registro de usuario es editable? ' + this.editable);
    if (this.editable === '1') {
      this.codUsuario = parseInt(localStorage.getItem('idUsuario'));
      console.log('existe un codigo? ' + this.codUsuario);
      await this.getUserById(this.codUsuario);
    }

    this.db.getDatabaseState().subscribe((rdy) => {
      if (rdy) {
        this.db.getUsuarios().subscribe((data) => {
          this.usuarios = data;
          console.log('Desde registros ts' + this.usuarios);
        });
      }
    });
  }

  limpiar() {
    this.nombres = '';
    this.direccion = '';
    this.telefono = '';
    this.email = '';
    this.cedula = '';
    this.contrasena = '';
  }

  async getUserById(codTicket: any) {
    this.usuarioService.getUserById(codTicket).then((data) => {
      this.usuarioUpdate = data;
      this.email = this.usuarioUpdate.email;
      this.contrasena = this.usuarioUpdate.contrasena;
      this.cedula = this.usuarioUpdate.persona.cedula;
      this.nombres = this.usuarioUpdate.persona.nombres;
      this.telefono = this.usuarioUpdate.persona.telefono;
      this.direccion = this.usuarioUpdate.persona.direccion;
    });
  }

  async upload() {
    if (this.editable === '1') {
      await this.modificarPersonaUsuario();
    } else {
      await this.createPersonaUsuario();
    }
    this.utils.presentToastLenin(this.sendMsg);
  }

  async createPersonaUsuario() {
    let dataPersona: Persona;
    let dataUsuario: usuario;

    dataPersona = {
      cedula: this.cedula.toString(),
      nombres: this.nombres,
      telefono: this.telefono,
      direccion: this.direccion,
    };

    dataUsuario = {
      email: this.email,
      contrasena: this.contrasena,
      persona: dataPersona,
    };

    console.log(dataPersona);
    console.log(dataUsuario);
    try {
      let personaStatus = (await this.personaService.createPersona(dataPersona))
        .status;
      console.log(personaStatus + ' persona status');
      if (personaStatus === 200 || personaStatus === 201) {
        try {
          let usuarioStatus = (
            await this.usuarioService.createUsuario(dataUsuario)
          ).status;
          console.log(usuarioStatus + ' usuario status');
          if (usuarioStatus === 200 || usuarioStatus === 201) {
            this.sendMsg = 'Usuario creado exitosamente ';
            this.router.navigateByUrl('/login');
            this.limpiar();
            //Almacenamiento en SQLite
            try {
              console.log('datos a guardar en bd ' + JSON.stringify(dataUsuario));
              await this.db.addUsuarios(dataUsuario).then((_) => {
                dataUsuario = null;
              });
            } catch (err) {
              console.log('Registrar Error ' + err.error);
            }
          } else {
            this.sendMsg = 'Hubo un problema al tratar de crear el Usuario';
          }
        } catch (error) {
          this.sendMsg = 'Error al tratar de crear un Usuario ';
          console.log(JSON.stringify(error) + ' error al crear una persona');
        }
      } else {
        this.sendMsg = 'Hubo un problema al tratar de crear la Persona';
      }
    } catch (error) {
      this.sendMsg = 'Error al tratar de crear una persona ';
      console.log(JSON.stringify(error) + ' error al crear una persona');
    }
  }

  async modificarPersonaUsuario() {
    let dataPersona: Persona;
    let dataUsuario: usuario;

    dataPersona = {
      cedula: this.cedula.toString(),
      nombres: this.nombres,
      telefono: this.telefono,
      direccion: this.direccion,
    };

    dataUsuario = {
      // codUsuario: this.codUsuario,
      email: this.email,
      contrasena: this.contrasena,
      persona: dataPersona,
    };

    console.log(dataPersona);
    console.log(dataUsuario);
    try {
      let personaStatus = (await this.personaService.updatePersona(dataPersona))
        .status;
      console.log(personaStatus + ' persona modificar status');
      if (personaStatus === 200 || personaStatus === 201) {
        try {
          let usuarioStatus = (
            await this.usuarioService.updateUsuario(
              dataUsuario,
              this.codUsuario
            )
          ).status;
          console.log(usuarioStatus + ' usuario modificar status');
          if (usuarioStatus === 200 || usuarioStatus === 201) {
            this.sendMsg = 'Usuario modificado exitosamente ';
            this.router.navigateByUrl('/lista-ticket-usuario');
            // Almacenamiento en SQLite
            try {
              console.log(
                'datos a actualizar en bd ' + JSON.stringify(dataUsuario)
              );
              await this.db.updateUsuarios(dataUsuario).then((_) => {
                dataUsuario = null;
              });
            } catch (err) {
              console.log('Registrar Error ' + err.error);
            }
          } else {
            this.sendMsg = 'Hubo un problema al tratar de modificar al usuario';
          }
        } catch (error) {
          this.sendMsg = 'Error al tratar de modificar un Usuario ';
          console.log(
            JSON.stringify(error) + ' error al modificar una usuario'
          );
        }
      } else {
        this.sendMsg = 'Hubo un problema al tratar de modificar la Persona';
      }
    } catch (error) {
      this.sendMsg = 'Error al tratar de modificar una persona ';
      console.log(JSON.stringify(error) + ' error al modificar una persona');
    }
  }

  hideShowPassword() {
    this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
    this.passwordIcon = this.passwordIcon === 'eye-off' ? 'eye' : 'eye-off';
  }

  Validaciones() {
    if (this.cedula != '') {
      this.validarCedula(this.cedula);
      if (this.nombres != '') {
        if (this.direccion != '') {
          if (this.telefono != '') {
            if (this.email != '') {
              if (this.contrasena != '') {
                if (this.tomarvalor == 1) {
                  this.upload();
                }
              } else {
                this.utils.presentToastLenin(
                  'El campo contraseña es requerido'
                );
              }
            } else {
              this.utils.presentToastLenin('El campo email es requerido');
            }
          } else {
            this.utils.presentToastLenin('El campo telefono es requerido');
          }
        } else {
          this.utils.presentToastLenin('El campo direccion es requerido');
        }
      } else {
        this.utils.presentToastLenin('El campo nombre es requerido');
      }
    } else {
      this.utils.presentToastLenin('El campo cedula es requerido');
    }
  }

  validarCedula(cedula) {
    if (cedula.length == 10) {
      //Obtenemos el digito de la region que sonlos dos primeros digitos
      var digito_region = cedula.substring(0, 2);

      //Pregunto si la region existe ecuador se divide en 24 regiones
      if (digito_region >= 1 && digito_region <= 24) {
        // Extraigo el ultimo digito
        var ultimo_digito = cedula.substring(9, 10);

        //Agrupo todos los pares y los sumo
        var pares =
          parseInt(cedula.substring(1, 2)) +
          parseInt(cedula.substring(3, 4)) +
          parseInt(cedula.substring(5, 6)) +
          parseInt(cedula.substring(7, 8));

        //Agrupo los impares, los multiplico por un factor de 2, si la resultante es > que 9 le restamos el 9 a la resultante
        var numero11 = cedula.substring(0, 1);
        var numero111 = numero11 * 2;
        var numero9 = 0;
        var numero3 = 0;
        var numero5 = 0;
        var numero7 = 0;
        var numero1 = 0;
        if (numero111 > 9) {
          numero1 = numero111 - 9;
        }

        var numero22 = cedula.substring(2, 3);
        var numero222 = numero22 * 2;
        if (numero222 > 9) {
          numero3 = numero222 - 9;
        }

        var numero33 = cedula.substring(4, 5);
        var numero333 = numero33 * 2;
        if (numero333 > 9) {
          numero5 = numero333 - 9;
        }

        var numero44 = cedula.substring(6, 7);
        var numero444 = numero44 * 2;
        if (numero444 > 9) {
          numero7 = numero444 - 9;
        }

        var numero55 = cedula.substring(8, 9);
        var numero555 = numero55 * 2;
        if (numero555 > 9) {
          numero9 = numero555 - 9;
        }

        var impares = numero1 + numero3 + numero5 + numero7 + numero9;

        //Suma total
        var suma_total = pares + impares;

        //extraemos el primero digito
        var primer_digito_suma = String(suma_total).substring(0, 1);

        //Obtenemos la decena inmediata
        var decena = (parseInt(primer_digito_suma) + 1) * 10;

        //Obtenemos la resta de la decena inmediata - la suma_total esto nos da el digito validador
        var digito_validador = decena - suma_total;

        //Si el digito validador es = a 10 toma el valor de 0
        if (digito_validador == 10) var digito_validador = 0;

        //Validamos que el digito validador sea igual al de la cedula
        if (digito_validador == ultimo_digito || ultimo_digito == 0) {
          console.log('la cedula:' + cedula + ' es correcta');
          this.tomarvalor = 1;
        } else {
          console.log('la cedula: ' + ultimo_digito + ' es incorrecta');
          this.utils.presentToastLenin('La cedula ingresada no es valida');
        }
      } else {
        // imprimimos en consola si la region no pertenece
        this.tomarvalor = 2;
        this.utils.presentToastLenin('La cedula ingresada no es valida');
        console.log('Esta cedula no pertenece a ninguna region');
      }
    } else {
      this.tomarvalor = 3;
      //imprimimos en consola si la cedula tiene mas o menos de 10 digitos
      this.utils.presentToastLenin('La cedula ingresada no es valida');
      console.log('Esta cedula tiene menos de 10 Digitos');
    }
  }
}
