import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { WelcomePage } from '../pages/welcome/welcome';
import { ProjetosPage } from '../pages/projetos/projetos';
import { ColaborandoPage } from '../pages/colaborando/colaborando';
import { GerenciandoPage } from '../pages/gerenciando/gerenciando';
import { ProjetoPage } from '../pages/projeto/projeto';




import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';

import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from  'angularfire2/auth';

import { GooglePlus } from '@ionic-native/google-plus';
import { GoogleLoginComponent } from './../components/google-login/google-login';
import { TarefasComponent } from '../components/tarefas/tarefas';
import { GraficosComponent } from '../components/graficos/graficos';
import { SobreComponent } from '../components/sobre/sobre';
import { ColaboradoresComponent } from '../components/colaboradores/colaboradores';
import { Camera } from '@ionic-native/camera';
import { IonicStorageModule } from '@ionic/storage';

import { ConfigProvider } from '../providers/config/config';
import { NotificacoesPage } from '../pages/notificacoes/notificacoes';
import { AddAtividadeComponent } from '../components/add-atividade/add-atividade';

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
    ColaboradoresComponent,
    TarefasComponent,
    GraficosComponent,
    SobreComponent,
    AddAtividadeComponent,
    TarefasComponent,
    ColaboradoresComponent,
    HomePage,
    WelcomePage,
    NotificacoesPage
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
    GoogleLoginComponent,
    ColaboradoresComponent,
    GraficosComponent,
    SobreComponent,
    AddAtividadeComponent,
    NotificacoesPage,
    TarefasComponent,
    HomePage,
    WelcomePage
  ],
  providers: [
    GooglePlus,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Camera,
    ConfigProvider
  ]
})
export class AppModule {}
