import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { WelcomePage } from '../pages/welcome/welcome';

import { ConfigProvider } from '../providers/config/config';
import { HomePage } from '../pages/home/home';
import { PerfilProjetoPage } from '../pages/perfil-projeto/perfil-projeto';
import { PerfilUsuarioPage } from '../pages/perfil-usuario/perfil-usuario';
import { NotificacoesPage } from '../pages/notificacoes/notificacoes';


@Component({
  templateUrl: 'app.html',
  providers: [
    ConfigProvider
  ]
})
export class MyApp {
  rootPage: any;

  constructor(platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    configProvider: ConfigProvider) {

    platform.ready().then(() => {

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
