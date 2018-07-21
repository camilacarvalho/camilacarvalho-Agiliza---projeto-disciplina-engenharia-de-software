import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import firebase from 'firebase';
import { Observable } from 'rxjs/Observable';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireStorage } from 'angularfire2/storage';
import { AngularFireDatabase } from 'angularfire2/database';



@IonicPage()
@Component({
  selector: 'page-colaborando',
  templateUrl: 'colaborando.html',
})
export class ColaborandoPage {

  userUid: String;
  projects: Observable<any[]>;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private afs: AngularFirestore,
    private afAuth: AngularFireAuth,
    private afStorage: AngularFireStorage,
    private db: AngularFireDatabase) {

      const firestoreSettings = {timestampsInSnapshots : true};  
      this.afs.firestore.settings(firestoreSettings);

      this.userUid = firebase.auth().currentUser.uid;
      
  }

  getProjects(){

    const projects = this.afs.collection('projects',
    ref => ref.where("collaborators."+this.userUid, '==', true)).valueChanges();
    
    return projects;
  }

  // getThumbnail(filePath){
    
  //   // return firebase.storage().ref().child(filePath).getDownloadURL().then( urlPic=>{
  //   //   console.log(urlPic);
  //   //   return urlPic;
  //   // })
  // }

  pushProjectPage(projectId){
    this.navCtrl.push('ProjetoPage');
  }

  loadSettingsPage() {
    this.navCtrl.push('SettingsPage');
  }
  
  ionViewDidLoad() {
    this.projects = this.getProjects();
  }
  
}
