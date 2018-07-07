import { ErrorHandler, NgModule } from '@angular/core';

import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from  'angularfire2/auth';

import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';

import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { GooglePlus } from '@ionic-native/google-plus';
import { Camera } from '@ionic-native/camera';
import { Firebase } from '@ionic-native/firebase';

import { TarefasComponent } from '../components/tarefas/tarefas';
import { GraficosComponent } from '../components/graficos/graficos';
import { SobreComponent } from '../components/sobre/sobre';
import { ColaboradoresComponent } from '../components/colaboradores/colaboradores';
import { AddAtividadeComponent } from '../components/add-atividade/add-atividade';

import { ConfigProvider } from '../providers/config/config';
import { FcmProvider } from '../providers/fcm/fcm';
import { GoogleLoginProvider } from '../providers/google-login/google-login';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { WelcomePage } from '../pages/welcome/welcome';

import { SettingsPageModule } from './../pages/settings/settings.module';
import { ProjetosPageModule } from './../pages/projetos/projetos.module';
import { ProjetoPageModule } from './../pages/projeto/projeto.module';
import { PerfilUsuarioPageModule } from './../pages/perfil-usuario/perfil-usuario.module';
import { NovoProjetoPageModule } from './../pages/novo-projeto/novo-projeto.module';
import { NotificacoesPageModule } from './../pages/notificacoes/notificacoes.module';
import { GerenciandoPageModule } from './../pages/gerenciando/gerenciando.module';
import { ColaborandoPageModule } from './../pages/colaborando/colaborando.module';


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
    WelcomePage
 
  ],
  imports: [
    BrowserModule,
    CommonModule,
    HttpModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    ColaborandoPageModule,
    GerenciandoPageModule,
    NotificacoesPageModule,
    NovoProjetoPageModule,
    PerfilUsuarioPageModule,
    ProjetoPageModule,
    ProjetosPageModule,
    SettingsPageModule

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ColaboradoresComponent,
    GraficosComponent,
    SobreComponent,
    AddAtividadeComponent,
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
    FcmProvider,
    Firebase,
    ConfigProvider,
    GoogleLoginProvider
  ]
})
export class AppModule {}
