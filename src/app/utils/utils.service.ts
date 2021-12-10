import { Injectable } from '@angular/core';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor(private toastCtrl: ToastController, private alertController: AlertController, public loadingController: LoadingController) { }


  async presentToast(message: string) {
    let toastItem = {
      "duration": 1000,
      "position": "buttom"
    };
    toastItem["message"] = message;
    let toast = this.toastCtrl.create();
    (await toast).present();
  }
  async presentToastLenin(message:string) {
    const toast = await this.toastCtrl.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }

  getAlertTicket(msg: string) {
    const alert = this.alertController.create({
      header: 'Información',
      message: msg,
      buttons: [{
        text: 'OK',
        role: 'cancel',
        handler: () => {
          this.presentLoading("Guardando");
          // this.alertController.dismiss();
        }
      }]
    });
    return alert;
  }

  getAlert(msg: string) {
    const alert = this.alertController.create({
      header: 'Información',
      message: msg,
      buttons: ['OK']
    });
    return alert;
  }

  getCerrarSesionAlert(msg: string) {
    const alert = this.alertController.create({
      header: 'Aviso',
      message: msg,
      buttons: ['Cancelar','Confirmar']
    });
    return alert;
  }

  async presentAlert(msg: string) {
    (await this.getAlert(msg)).present();
  }

  async presentAlertLogout(msg: string) {
    (await this.getCerrarSesionAlert(msg)).present();
  }

  async presentAlertTicket(msg: string) {
    (await this.getAlertTicket(msg)).present();
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
      loading.dismiss();
    }, 3000);
  }
}
