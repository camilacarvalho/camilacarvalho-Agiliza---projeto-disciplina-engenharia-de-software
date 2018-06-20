import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { LoginPage } from './../pages/login/login';
import { PerfilProjetoPage } from '../pages/perfil-projeto/perfil-projeto';
import { PerfilUsuarioPage } from '../pages/perfil-usuario/perfil-usuario';
import { NotificacoesPage } from '../pages/notificacoes/notificacoes';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any =  PerfilProjetoPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}
