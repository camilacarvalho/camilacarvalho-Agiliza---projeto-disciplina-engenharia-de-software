import { Component } from '@angular/core';
import { Platform, Toast, ToastController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { Subject } from 'rxjs/Subject';
import { tap } from 'rxjs/operators';

import { ConfigProvider } from '../providers/config/config';
import { FcmProvider } from './../providers/fcm/fcm';
import { GoogleLoginProvider } from './../providers/google-login/google-login';

import { WelcomePage } from '../pages/welcome/welcome';
import { HomePage } from '../pages/home/home';
import { ProjetosPage } from '../pages/projetos/projetos';


@Component({
  templateUrl: 'app.html',
  providers: [
    ConfigProvider,
    GoogleLoginProvider
  ]
})

export class MyApp {
  rootPage: any;

  constructor(platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    configProvider: ConfigProvider,
    toastCtrl: ToastController,
    fcm: FcmProvider,
    googleLoginProvider: GoogleLoginProvider) {

    platform.ready().then(() => {

      if(platform.is('cordova')){
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
     }
      // Verifies the root page of the application.
      let config = configProvider.getConfigData();

      if (config == null) {
        this.rootPage = WelcomePage;
        configProvider.setConfigData(false);
      } else {
        this.rootPage = HomePage;
      }

      console.log(config);

      statusBar.styleDefault();
      splashScreen.hide();

    });
  }
}

