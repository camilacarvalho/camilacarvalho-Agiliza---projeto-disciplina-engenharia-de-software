import { Component } from '@angular/core';
import { ToastController } from 'ionic-angular';

@Component({
  selector: 'add-atividade',
  templateUrl: 'add-atividade.html'
})
export class AddAtividadeComponent {

  private atividade: any;
  private data_atual;
  private colaboradores: string[];
  constructor(public toastCtrl: ToastController) {
    this.initializeColaboradores();
    this.atividade={nome:"",prazo:"",agenda:false,colaboradores_atv:[] }
  }
  criarAtividade(){
    if(this.camposValidos()==true){
      this.presentToast("Alterações salvas!");
    }
  }
  initializeColaboradores(): any {
    this.colaboradores = ["camila.silva@ccc.ufcg.edu.br","samara.sampaio@ccc.ufcg.edu.br","pedro.braga@ccc.ufcg.edu.br","anderson.vital@ccc.ufcg.edu.br","aramis.araujo@ccc.ufcg.edu.br", "jose.ivan.junior@ccc.ufcg.edu.br", "gabriel.alves@ccc.ufcg.edu.br", "bruno.silva@ccc.ufcg.edu.br", "lucas.christopher.silva@ccc.ufcg.edu.br", "sheilla.silva@ccc.ufcg.edu.br"];
  }
  presentToast(mensagem) {
    let toast = this.toastCtrl.create({
      message: mensagem,
      duration: 3000
    });
    toast.present();
  }
  camposValidos() {
    if ((this.atividade.nome.trim() == "") || (this.atividade.prazo.trim() == "") || (this.atividade.colaboradores_atv.length==0)) {
      this.presentToast("Preencha todos os campos!");
      return false;
    }
    return true;
  }

  getDataAtual() {
    var data = new Date();
    var dia: number = data.getDate();
    var mes: number = data.getMonth();
    var ano: number = data.getFullYear();

    if (mes < 10) {
      this.data_atual = ano + "-0" + (mes + 1);
    } else {
      this.data_atual = ano + "-" + (mes + 1);
    }
    if (dia < 10) {
      this.data_atual += "-0" + dia;
    } else {
      this.data_atual += "-" + dia;
    }
  }
  ionViewDidEnter() {
    this.getDataAtual();
  }
}
