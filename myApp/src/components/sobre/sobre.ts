import { Component } from '@angular/core';
import { ToastController } from 'ionic-angular';

@Component({
  selector: 'sobre',
  templateUrl: 'sobre.html'
})
export class SobreComponent {

  private projeto: any;
  private novo_projeto: any;
  private editar: boolean;
  private data_atual;

  constructor(public toastCtrl: ToastController) {

    this.projeto = { nome: "Sarrafo", descricao: "Nosso sarrafo é o melhor!", qnt_colaboradores: 9, previsao_finalizacao: "2018-06-08" };
    this.novo_projeto = { nome: this.projeto.nome, descricao: this.projeto.descricao, qnt_colaboradores: this.projeto.qnt_colaboradores, previsao_finalizacao: this.projeto.previsao_finalizacao };
    this.editar = true;
  }

  cancelar() {
    this.novo_projeto.nome = this.projeto.nome;
    this.novo_projeto.descricao = this.projeto.descricao;
    this.novo_projeto.qnt_colaboradores = this.projeto.qnt_colaboradores;
    this.novo_projeto.previsao_finalizacao = this.projeto.previsao_finalizacao;
    this.editar = true;
  }
  salvar() {
    if (this.camposValidos() == true) {
      this.projeto.nome = this.novo_projeto.nome;
      this.projeto.descricao = this.novo_projeto.descricao;
      this.projeto.qnt_colaboradores = this.novo_projeto.qnt_colaboradores;
      this.projeto.previsao_finalizacao = this.novo_projeto.previsao_finalizacao;
      this.editar = true;
      this.presentToast("Alterações salvas!");
   }
  }

  presentToast(mensagem) {
    let toast = this.toastCtrl.create({
      message: mensagem,
      duration: 3000
    });
    toast.present();
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



  camposValidos() {
    if ((this.novo_projeto.nome.trim() == "") || (this.novo_projeto.descricao.trim() == "") || (this.novo_projeto.previsao_finalizacao.trim() == "")) {
      this.presentToast("Preencha todos os campos!");
      return false;
    }
    return true;
  }

}