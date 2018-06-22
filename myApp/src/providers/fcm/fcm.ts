
import { Injectable } from '@angular/core';

import { Firebase } from '@ionic-native/firebase';
import { AngularFirestore } from 'angularfire2/firestore';
import { Platform } from 'ionic-angular';




/*
  Generated class for the FcmProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FcmProvider {

  constructor(public firebaseNative: Firebase,
  public afs: AngularFirestore, public platform: Platform) {}



  async getToken(){
    let token;
    if(this.platform.is('cordova')){
      token =  await this.firebaseNative.getToken();
    }else{
      token = 'nao e cordova!'
    }
    return this.saveTokenToFirestore(token);
  }

  // Save the token to firestore
  private saveTokenToFirestore(tkn) {
    const devicesRef = this.afs.collection('devices');
    const docData = {
      token: tkn,
      userId: 'UsuarioTest'
    };
    return this.afs.collection('devices').add(docData);
  }


  listenToNotifications() {}
}
