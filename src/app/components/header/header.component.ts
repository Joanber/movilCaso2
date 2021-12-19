import { Component, OnInit, Input, NgModule } from '@angular/core';
import { Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import { UsuarioService } from 'src/app/services/usuario.service';
import { PopinfoComponent } from '../popinfo/popinfo.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input() titulo:string;
  
  constructor( private popoverCtrl: PopoverController, public usuarioService: UsuarioService, private router: Router ) { }

  ngOnInit() {
  }

  async mostrarPop( evento ) {

    const popover = await this.popoverCtrl.create({
      component: PopinfoComponent,
      event: evento,
      mode: 'ios',
      backdropDismiss: false
    });

    await popover.present();

    // const { data } = await popover.onDidDismiss();
    const { data } = await popover.onWillDismiss();


  }
  logout() {
    this.usuarioService.logout();
    this.router.navigate(["/login"]);
  }




}




