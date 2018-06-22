import { Component, trigger } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController } from 'ionic-angular';
import { AlertController, ToastController } from 'ionic-angular';
import { PerfilProjetoPage } from '../perfil-projeto/perfil-projeto';
import { SobreComponent } from '../../components/sobre/sobre';
import { FcmProvider } from '../../providers/fcm/fcm';

@IonicPage()
@Component({
  selector: 'page-notificacoes',
  templateUrl: 'notificacoes.html',
})
export class NotificacoesPage {
  private notificacao: any;
  private notificacoes = [];


  constructor(public fcm: FcmProvider, public popoverCtrl: PopoverController, public toastCtrl: ToastController, public alertCtrl: AlertController, public navCtrl: NavController, public navParams: NavParams) {
    this.preencherNotificacoes();
    
  }

  ionViewDidLoad(){
     this.fcm.getToken();
  }

  getNotificacoes(ev: any) {
    this.preencherNotificacoes();
    const val = ev.target.value;
    if (val && val.trim() != '') {
      this.notificacoes = this.notificacoes.filter((notificacao) => {
        return (notificacao.mensagem.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

  preencherNotificacoes(): any {
    this.notificacoes = [];
    this.notificacao = { tipo: TipoNotificacao.NovaAtividade, vista: true, imagem: "assets/imgs/img_padrao_projeto.png", mensagem: "Anderson Dalbert lhe mencionou como colaborador na atividade 'Wireframing' em 'Projeto ES'." };
    this.notificacoes.push(this.notificacao);
    this.notificacao = { tipo: TipoNotificacao.Revisao, vista: true, imagem: "assets/imgs/revisao.png", mensagem: "Sua submissão da atividade 'Criar o diagrama de classes' foi marcada para revisão." };
    this.notificacoes.push(this.notificacao);
    this.notificacao = { tipo: TipoNotificacao.Chat, vista: true, imagem: "assets/imgs/chat.png", mensagem: "4 mensagens não lidas em 2 chats." };
    this.notificacoes.push(this.notificacao);
    this.notificacao = { tipo: TipoNotificacao.NovoProjeto, vista: true, imagem: "assets/imgs/img_padrao_projeto.png", mensagem: "Você foi convidado a participar do projeto 'Sarrafo-2018' por 'Sheyla Silva'." };
    this.notificacoes.push(this.notificacao);
    this.notificacao = { tipo: TipoNotificacao.Prazo, vista: true, imagem: "assets/imgs/revisao.png", mensagem: "A atividade 'fazer projeto de ES' está próximo do prazo de entrega com data '28/06/2018'." };
    this.notificacoes.push(this.notificacao);
  }

  limparNotificacoes() {
    if (this.notificacoes.length > 0) {
      let mensagem = "Deseja excluir todas as notificações?";
      let excluir = this.confirmarExclusao(mensagem);
    }else{
      this.informacoes("Você não possui notificações!");
    }
  }

  limparNotificacao(notificacao) {
    let mensagem = "Deseja excluir a notificação de " + notificacao.tipo.toLowerCase() + "?";
    let excluir = this.confirmarExclusao(mensagem, notificacao);
  }
  informacoes(mensagem) {
    const toast = this.toastCtrl.create({
      message: mensagem,
      duration: 3000
    });
    toast.present();
  }
  showAlert(notificacao) {
    const alert = this.alertCtrl.create({
      title: notificacao.tipo,
      message: notificacao.mensagem,
      buttons: [{
        text: 'aceitar',
        handler: data => {
          if (notificacao.tipo == TipoNotificacao.NovoProjeto)
            //adiciona o colaborador ao projeto
            this.navCtrl.push(PerfilProjetoPage);
          else
            //marcar atividade como concluída
            this.navCtrl.push(PerfilProjetoPage);
        }
      }, {
        text: 'recusar',
        handler: data => {
          this.limparNotificacao(notificacao);

        }
      }]
    });
    alert.present();
  }
  confirmarExclusao(subtitulo, notificacao?) {
    const prompt = this.alertCtrl.create({
      subTitle: subtitulo,
      buttons: [
        { text: 'Não', },
        {
          text: 'Sim', handler: data => {
            if(notificacao!=null){
              const index = this.notificacoes.indexOf(notificacao);
              this.notificacoes.splice(index, 1);
              this.informacoes("Notificação excluída!");
            }else{
              this.notificacoes = [];
              this.informacoes("Notificações excluídas!");
            }
            
          }
        }
      ]
    });
    prompt.present();
  }

  visualizarCard(notificacao) {
    this.desabilita(notificacao);
    this.acaoNotificacao(notificacao);
  }

  acaoNotificacao(notificacao) {
    switch (notificacao.tipo) {

      case TipoNotificacao.NovaAtividade:
      case TipoNotificacao.Prazo:
        this.navCtrl.push(PerfilProjetoPage);
        break;

      case TipoNotificacao.NovoProjeto:
        let aceitarR = this.showAlert(notificacao);
        break;

      case TipoNotificacao.Revisao:
        let aceitar = this.showAlert(notificacao);
        break;

      default:
        console.log('Ops! Algo deu errado');
        break;

    }
  }

  desabilita(notificacao): any {
    this.notificacoes.forEach(element => {
      if (element == notificacao) {
        element.vista = false;
      }
    });
  }
}

export enum TipoNotificacao {
  NovaAtividade = "Nova Atividade",
  Chat = "Chat",
  Revisao = "Revisão",
  Prazo = "Prazo",
  NovoProjeto = "Novo Projeto"
}