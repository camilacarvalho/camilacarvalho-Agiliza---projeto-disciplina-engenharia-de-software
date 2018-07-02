import { ErrorHandler, NgModule } from '@angular/core';

import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from  'angularfire2/auth';

import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { GooglePlus } from '@ionic-native/google-plus';
import { Camera } from '@ionic-native/camera';
import { Firebase } from '@ionic-native/firebase';

import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';

import { TarefasComponent } from '../components/tarefas/tarefas';
import { GraficosComponent } from '../components/graficos/graficos';
import { SobreComponent } from '../components/sobre/sobre';
import { ColaboradoresComponent } from '../components/colaboradores/colaboradores';

import { ConfigProvider } from '../providers/config/config';
import { NotificacoesPage } from '../pages/notificacoes/notificacoes';
import { FcmProvider } from '../providers/fcm/fcm';
import { AddAtividadeComponent } from '../components/add-atividade/add-atividade';
import { GoogleLoginProvider } from '../providers/google-login/google-login';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { PerfilProjetoPage } from '../pages/perfil-projeto/perfil-projeto';
import { PerfilUsuarioPage } from '../pages/perfil-usuario/perfil-usuario';
import { WelcomePage } from '../pages/welcome/welcome';


export const firebaseConfig = {
  apiKey: "AIzaSyCxIg5B8z2F531HyxDiKSprhF-P4ueDi7Y",
  authDomain: "fiery-cumbuca.firebaseapp.com",
  databaseURL: "https://fiery-cumbuca.firebaseio.com",
  projectId: "fiery-cumbuca",
  storageBucket: "fiery-cumbuca.appspot.com",
  messagingSenderId: "1007339278316",
  timestampsInSnapshots: true
};

@NgModule({
  declarations: [
    MyApp,
    ColaboradoresComponent,
    TarefasComponent,
    GraficosComponent,
    SobreComponent,
    AddAtividadeComponent,
    TarefasComponent,
    ColaboradoresComponent, 
    HomePage,
    WelcomePage,
    PerfilProjetoPage,
    PerfilUsuarioPage,
    NotificacoesPage,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    HttpModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ColaboradoresComponent,
    GraficosComponent,
    SobreComponent,
    AddAtividadeComponent,
    PerfilProjetoPage,
    NotificacoesPage,
    TarefasComponent,
    HomePage,
    WelcomePage,
    PerfilProjetoPage,
    PerfilProjetoPage,
    PerfilUsuarioPage
  ],
  providers: [
    GooglePlus,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Camera,
    FcmProvider,
    Firebase,
    ConfigProvider,
    GoogleLoginProvider
  ]
})
export class AppModule {}
