import { GoogleLoginProvider } from './../../providers/google-login/google-login';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import firebase from 'firebase/app';
import { ColaborandoPage } from '../colaborando/colaborando';

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
    this.user.subscribe( (auth) => {
      if (auth != null){
        this.navCtrl.push(ColaborandoPage);

      }
    })
    
  }

  googleLogin(){
    this.googleLoginProvider.login();
  }

  signOut(){
    this.googleLoginProvider.signOut();
  }

  pular() {
    this.navCtrl.push('ProjetosPage');
  }
}
