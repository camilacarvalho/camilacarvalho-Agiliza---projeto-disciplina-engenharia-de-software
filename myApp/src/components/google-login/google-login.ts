import { Component } from '@angular/core';

import firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';

import { GooglePlus } from '@ionic-native/google-plus';
import { Platform, NavController } from 'ionic-angular';

@Component({
  selector: 'google-login',
  templateUrl: 'google-login.html'
})
export class GoogleLoginComponent {

  user: Observable<firebase.User>;

  constructor(private afAuth: AngularFireAuth,
    private gplus: GooglePlus,
    private platform: Platform,
    public navCtrl: NavController) {

    this.user = this.afAuth.authState;

  }
  getPhoto() {
    this.user.subscribe((auth) => {
      if (auth != null) {
        return this.afAuth.auth.currentUser.photoURL;
      }
    })
  }
  googleLogin() {
    if (this.platform.is('cordova')) {
      this.nativeGoogleLogin();
    } else {
      this.webGoogleLogin();
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
