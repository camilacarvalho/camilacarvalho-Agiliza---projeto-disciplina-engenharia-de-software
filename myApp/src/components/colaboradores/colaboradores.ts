import { Component } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from 'angularfire2/firestore';
import {AngularFireAuth} from 'angularfire2/auth';
import {ToastController} from 'ionic-angular'


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

  

  constructor(public toastCtrl: ToastController, public afs: AngularFirestore, private afAuth: AngularFireAuth) {

  }

  
   ngOnInit(){ //Como ainda não temos o botão, testando aqui
     this.sendCollaborationRequest('pedro.braga@ccc.ufcg.edu.br', 'VLvjoxho1cSLW7859WBv')
  }

  

    

  public async sendCollaborationRequest(userEmail, projectId){
    var userRequestedId, projectName;
    const notificationsRef = this.afs.collection('notifications')
    const usersRef = this.afs.firestore.collection('users');
    const projectsRef = this.afs.firestore.collection('projects');
    var toast = this.toastCtrl.create({});

    await projectsRef.doc(projectId).get()
    .then(snap => projectName = snap.data().projectName)
    .catch(err => console.log('Error while finding project name!'))

     await usersRef.where('email', '==', userEmail).get()
    .then(snap => userRequestedId = snap.docs[0].id)
    .catch(err => toast.setMessage('Usuário não encontrado, verifique o e-mail e tente novamente')); 

    const notification = {
      message: 'Você foi convidado para participar do projeto ' + projectName,
      projectId,
      seen: false,
      type: 'convitecolaborador',
      userId: userRequestedId
    };
    
    if(userRequestedId != undefined){
      await notificationsRef.add(notification)
      .then(response => toast.setMessage('Convite enviado com sucesso'))
      .catch(err => toast.setMessage('Erro ao enviar o convite. Tente novamente'));
    }
    toast.setDuration(3000).setPosition('top').present();
  } 
}
