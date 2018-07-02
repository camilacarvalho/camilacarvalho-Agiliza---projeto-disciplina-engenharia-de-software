import { Injectable } from '@angular/core';

import firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';

import { GooglePlus } from '@ionic-native/google-plus';
import { Platform, NavController } from 'ionic-angular';
import { NotificacoesPage } from '../../pages/notificacoes/notificacoes';
import { FcmProvider } from "../../providers/fcm/fcm";


@Injectable()
export class GoogleLoginProvider {

  user: Observable<firebase.User>;

  constructor(private afAuth: AngularFireAuth,
    private gplus: GooglePlus,
    private platform: Platform,
    public fcm: FcmProvider) {

    this.user = this.afAuth.authState;

  }

  getPhoto() {
    this.user.subscribe((auth) => {
      if (auth != null) {
        return this.afAuth.auth.currentUser.photoURL;
      }
    })
  }

  login() {
    if (this.platform.is('cordova')) {
      this.nativeGoogleLogin().then(success => this.fcm.getToken());
    } else {
      this.webGoogleLogin().then(success => this.fcm.getToken());
    }
  }

  async nativeGoogleLogin(): Promise<void> {

    try {

      const gplusUser = await this.gplus.login({
        'webClientId': '1007339278316-rgoodb6898i6rgdcsm0k6qklqgg1sb77.apps.googleusercontent.com',
        'offline': true,
        'scopes': 'profile email'
      })
      return await this.afAuth.auth.signInWithCredential(
        firebase.auth.GoogleAuthProvider.credential(gplusUser.idToken))

    } catch (err) {
      console.log(err)
    }

  }

  async webGoogleLogin(): Promise<void> {
    try {
      const provider = new firebase.auth.GoogleAuthProvider();
      const credential = await this.afAuth.auth.signInWithPopup(provider);

      return credential;
    } catch (err) {
      console.log(err)
    }
  }


  signOut() {

    this.afAuth.auth.signOut();

    if (this.platform.is('cordova')) {
      this.gplus.logout();
    }

  }

}
