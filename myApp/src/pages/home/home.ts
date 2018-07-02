import { GoogleLoginProvider } from './../../providers/google-login/google-login';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import firebase from 'firebase/app';
import { NotificacoesPage } from '../notificacoes/notificacoes';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  user: Observable<firebase.User>;

  constructor(public navCtrl: NavController, 
    private asf: AngularFirestore,
    private googleLoginProvider: GoogleLoginProvider) {

    this.user = this.googleLoginProvider.user;

  }

  ionViewDidLoad(){
    if(this.user.subscribe( (auth) => {
      return auth.uid;
    })){
      this.navCtrl.push(NotificacoesPage);
    }
  }

  googleLogin(){
    this.googleLoginProvider.login();
  }

  signOut(){
    this.googleLoginProvider.signOut();
  }

}
