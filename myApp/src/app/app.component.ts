import { Component } from '@angular/core';
import { Platform, Toast, ToastController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { Subject } from 'rxjs/Subject';
import { tap } from 'rxjs/operators';

import { HomePage } from '../pages/home/home';
import { LoginPage } from './../pages/login/login';
import { PerfilProjetoPage } from '../pages/perfil-projeto/perfil-projeto';
import { PerfilUsuarioPage } from '../pages/perfil-usuario/perfil-usuario';
import { NotificacoesPage } from '../pages/notificacoes/notificacoes';

import { FcmProvider } from '../providers/fcm/fcm';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any =  LoginPage;

  constructor(fcm: FcmProvider, toastCtrl: ToastController, platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      fcm.getToken();
      fcm.listenToNotifications().pipe(
        tap(msg => {
          // show a toast
          const toast = toastCtrl.create({
            message: msg.body,
            duration: 3000
          });
          toast.present();
        })
      ).subscribe();

      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}
