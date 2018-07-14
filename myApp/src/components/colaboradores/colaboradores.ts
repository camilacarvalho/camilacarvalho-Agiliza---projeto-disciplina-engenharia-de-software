import { Component } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from 'angularfire2/firestore';
import {AngularFireAuth} from 'angularfire2/auth';


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
     
  }

  

    

  public async sendCollaborationRequest(userEmail, projectId){
    var userRequestedId;
    var projectName
    const notificationsRef = this.afs.collection('notifications')
    const usersRef = this.afs.firestore.collection('users');
    const projectsRef = this.afs.firestore.collection('projects');

    
    await projectsRef.doc(projectId).get()
    .then(snap => projectName = snap.data().projectName)
    .catch(err => console.log('Error while finding project name!'))



    //Busca usuario para atribuir o id a notification
     await usersRef.where('email', '==', userEmail).get()
    .then(snap => userRequestedId = snap.docs[0].id)
    .catch(err => console.log('Error while finding userRequestedId!')); 

    const notification = {
      message: 'Você foi convidado para participar do projeto ' + projectName,
      projectId,
      seen: false,
      type: 'convitecolaborador',
      userId: userRequestedId
    };

    

    notificationsRef.add(notification)
    .then(response => console.log("Notification sent! " + response))
    .catch(err => console.log('Error while sending notification! id do usuario: ' + 
    this.afAuth.auth.currentUser.uid + " err: " + err));
    

} 

}
