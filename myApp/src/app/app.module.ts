import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from './../pages/login/login';


import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';

import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from  'angularfire2/auth';

import { GooglePlus } from '@ionic-native/google-plus';
import { GoogleLoginComponent } from './../components/google-login/google-login';
import { PerfilProjetoPage } from '../pages/perfil-projeto/perfil-projeto';
import { TarefasComponent } from '../components/tarefas/tarefas';
import { GraficosComponent } from '../components/graficos/graficos';
import { SobreComponent } from '../components/sobre/sobre';
import { ColaboradoresComponent } from '../components/colaboradores/colaboradores';
import { PerfilUsuarioPage } from '../pages/perfil-usuario/perfil-usuario';
import { Camera } from '@ionic-native/camera';

export const firebaseConfig = {
  apiKey: "AIzaSyCxIg5B8z2F531HyxDiKSprhF-P4ueDi7Y",
  authDomain: "fiery-cumbuca.firebaseapp.com",
  databaseURL: "https://fiery-cumbuca.firebaseio.com",
  projectId: "fiery-cumbuca",
  storageBucket: "fiery-cumbuca.appspot.com",
  messagingSenderId: "1007339278316"
};

@NgModule({
  declarations: [
    MyApp,
    GoogleLoginComponent,
    LoginPage,
    HomePage,
    PerfilProjetoPage,
    TarefasComponent,
    PerfilProjetoPage,
    GraficosComponent,
    SobreComponent,
    ColaboradoresComponent,
    PerfilUsuarioPage
  ],
  imports: [
    BrowserModule,
    CommonModule,
    HttpModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    GoogleLoginComponent,
    LoginPage,
    PerfilProjetoPage,
    TarefasComponent,
    PerfilProjetoPage,
    GraficosComponent,
    SobreComponent,
    ColaboradoresComponent,
    PerfilUsuarioPage

  ],
  providers: [
    GooglePlus,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Camera
  ]
})
export class AppModule {}
