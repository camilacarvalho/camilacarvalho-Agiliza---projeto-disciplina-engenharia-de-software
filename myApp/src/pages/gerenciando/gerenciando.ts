import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs';
import { AngularFirestore } from 'angularfire2/firestore';
import { firebase } from '@firebase/app';
import { map } from 'rxjs/operators';




@IonicPage()
@Component({
  selector: 'page-gerenciando',
  templateUrl: 'gerenciando.html',
})
export class GerenciandoPage {

  projects: Observable<any[]>;
  userUid: String;

  // projetosSendoGerenciadosObject : Object = [
  //   {
  //     nome: "Agiliza",
  //     descricao: "O Agiliza é um app organizador de projetos",
  //     dataInicio: "15/06/2018",
  //     dataTermino: "01/07/2018"
  //   },
  //   {
  //     nome: "MeOrganiza",
  //     descricao: "O MeOrganiza é um app top vencedor de altos prêmios",
  //     dataInicio: "15/11/2017",
  //     dataTermino: "11/01/2018"
  //   },
  // ];

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private afs: AngularFirestore) {

      this.userUid = firebase.auth().currentUser.uid;
    }

  getProjects(){

    return this.afs.collection('projects',
    ref => ref.where("ownerId", '==', this.userUid))
    .snapshotChanges().pipe(
     map(actions => {
      return actions.map(a =>{
        let data = a.payload.doc.data();
        let id = a.payload.doc.id;
        let obj = {id, ...data};
        return(obj);
      })
    }));
  }

  novoProjeto() {
    this.navCtrl.push('NovoProjetoPage');
  }

  buttonProjetoClick(projectID) {
    console.log(projectID);
    this.navCtrl.push('ProjetoPage');
  }

  loadSettingsPage() {
    this.navCtrl.push('SettingsPage');
  }

  ionViewDidLoad() {
    this.projects = this.getProjects();
  }
}
