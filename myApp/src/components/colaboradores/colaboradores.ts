import { Component } from '@angular/core';
import {AngularFirestore} from 'angularfire2/firestore';
import {AngularFireAuth} from 'angularfire2/auth';
import { UrlSerializer } from 'ionic-angular/umd';
import { makePropDecorator } from '@angular/core/src/util/decorators';

/**
 * Generated class for the ColaboradoresComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'colaboradores',
  templateUrl: 'colaboradores.html'
})
export class ColaboradoresComponent {



  constructor(public afs: AngularFirestore, private afAuth: AngularFireAuth) {

  }

  
   ngOnInit(){
     this.sendCollaborationRequest('pedro.braga@ccc.ufcg.edu.br', 'nomeDoProjeto', 'idDoProjeto');
  }

  

    

  //Envia notificacao de colaboracao para um usuario do sistema
  public sendCollaborationRequest(userEmail, projectName, projectId){
    var userRequestedId = 'idDoUsuarioAReceberNotification'
    const notificationsRef = this.afs.firestore.collection('notifications');
    const usersRef = this.afs.firestore.collection('users');

    
    //Codigo que busca usuario para atribuir o id a notification
    usersRef.where('email', '==', userEmail).get()
    .then(snap => userRequestedId = snap.docs[0].id)
    .catch(err => userRequestedId = 'idDoDocumento'); 
    
    const notification = {
      message: 'Você foi convidado para participar do projeto ' + projectName,
      projectId,
      seen: 'true',
      type: 'novoprojeto',
      userId: userRequestedId
    };

    

    notificationsRef.add(notification)
    .then(response => console.log("Notification sent! " + response))
    .catch(err => console.log('Error while sending notification! id do usuario: ' + 
    this.afAuth.auth.currentUser.uid + " err: " + err));
    

} 

}
