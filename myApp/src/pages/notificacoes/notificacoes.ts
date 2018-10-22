import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController } from 'ionic-angular';
import { AlertController, ToastController } from 'ionic-angular';
import { ProjetoPage } from '../projeto/projeto';
import { FcmProvider } from '../../providers/fcm/fcm';
import firebase from '@firebase/app';
import { Observable } from 'rxjs/Observable';
import { AngularFirestore } from 'angularfire2/firestore';
import { map } from 'rxjs/operators';
import { AngularFireAuth } from 'angularfire2/auth';

@IonicPage()
@Component({
  selector: 'page-notificacoes',
  templateUrl: 'notificacoes.html',
})
export class NotificacoesPage {

  private notificacoes: Observable<any[]>;
  userUid: String;


  constructor(public fcm: FcmProvider,
    public popoverCtrl: PopoverController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public navCtrl: NavController,
    public navParams: NavParams,
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore) {

    
    this.userUid = firebase.auth().currentUser.uid;

  }

  ionViewDidLoad(){
    this.notificacoes = this.getNotificacoes();

  }

  getNotificacoes(event?) {
    
    return this.afs.collection('notifications', ref => ref.where("userId", '==', this.userUid))
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


  getImgSource(notifType){
    const projeto = "assets/imgs/img_padrao_projeto.png";
    const revisao = "assets/imgs/revisao.png";
    const chat = "assets/imgs/chat.png";

    switch (notifType){
      case TipoNotificacao.Chat:
        return chat;
    
      case TipoNotificacao.Prazo:
      case TipoNotificacao.Revisao:
        return revisao;

      case TipoNotificacao.NovaAtividade:
      case TipoNotificacao.NovoProjeto:
        return projeto;

      default:
        return "";

    }
  }

  limparNotificacoes() {
    if (!this.notificacoes.isEmpty) {
      let mensagem = "Deseja excluir todas as notificações?";
      this.confirmarExclusao(mensagem);
    }else{
      this.sendToast("Você não possui notificações!");
    }
  }

  limparNotificacao(notificacao) {
    let mensagem = "Deseja excluir a notificação de " + notificacao.type.toLowerCase() + "?";
    this.confirmarExclusao(mensagem, notificacao);
  }

  sendToast(mensagem) {
    const toast = this.toastCtrl.create({
      message: mensagem,
      duration: 3000
    });
    toast.present();
  }

  setNewCollab(projectId, userId){

    return this.afs.collection('projects').doc(projectId)
    .update({["collaborators." + userId]: true});
  }

  reviewTaskFinished(activityId){

    return this.afs.collection('tasks').doc(activityId)
    .update({finished: true});
  }

  showAlert(notificacao) {
    const alert = this.alertCtrl.create({
      title: notificacao.type,
      message: notificacao.message,
      buttons: [{
        text: 'Aceitar',
        handler: data => {
          if (notificacao.type == TipoNotificacao.NovoProjeto){

            this.setNewCollab(notificacao.projectId, notificacao.userId);
            this.eraseNotification(notificacao.id);
            this.navCtrl.push('ColaborandoPage');
          }

          else if (notificacao.type == TipoNotificacao.Revisao){

            this.reviewTaskFinished(notificacao.taskId);
            this.eraseNotification(notificacao.id);
            //add project id on redirect
            this.navCtrl.push('ProjetoPage');
          }

        }
      }, {
        text: 'Recusar',
        handler: data => {
          this.limparNotificacao(notificacao);

        }
      }]
    });
    alert.present();
  }

  eraseNotification(notifId){

    return this.afs.collection('notifications')
    .doc(notifId).delete();

  }

  eraseAllNotifications(userId){
    return this.afs.collection('notifications')
    .ref.where("userId", '==', userId).get().then( notifications => {
      notifications.forEach( notif =>{
        notif.ref.delete();
      })
    });
  }

  confirmarExclusao(subtitulo, notificacao?) {
    const prompt = this.alertCtrl.create({
      subTitle: subtitulo,
      buttons: [
        { text: 'Não', },
        {
          text: 'Sim', handler: data => {
            if(notificacao!=null){
              //erase this notification
              this.eraseNotification(notificacao.id);
              this.sendToast("Notificação excluída!");
            }else{
              //erase all notifications
              this.eraseAllNotifications(this.userUid);
              this.sendToast("Notificações excluídas!");
            }

          }
        }
      ]
    });
    prompt.present();
  }

  visualizarCard(notificacao) {
    this.setNotifSeen(notificacao.id);
    this.acaoNotificacao(notificacao);
  }

  acaoNotificacao(notificacao) {
    switch (notificacao.type) {

      case TipoNotificacao.NovaAtividade:
      case TipoNotificacao.Prazo:
        //add project id on redirect
        this.navCtrl.push(ProjetoPage);
        break;

      case TipoNotificacao.NovoProjeto:
        this.showAlert(notificacao);
        break;

      case TipoNotificacao.Revisao:
        this.showAlert(notificacao);
        break;

      default:
        console.log('Notification action type not found: ' + notificacao.type);
        break;

    }
  }

  setNotifSeen(notifId) {
    
    return this.afs.collection('notifications')
    .doc(notifId).update({seen: true});
  }

  ionViewDidEnter(){
    if(this.notificacoes.isEmpty){
    this.sendToast("Você não possui notificações!");
    }
  }
}

export enum TipoNotificacao {
  NovaAtividade = "Nova Atividade",
  Chat = "Chat",
  Revisao = "Revisão",
  Prazo = "Prazo",
  NovoProjeto = "Novo Projeto"
}
