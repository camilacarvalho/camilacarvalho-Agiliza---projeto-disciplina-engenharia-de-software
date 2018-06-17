import { Component } from '@angular/core';

@Component({
  selector: 'add-atividade',
  templateUrl: 'add-atividade.html'
})
export class AddAtividadeComponent {
  private atividade: any;
  private data_atual;
  constructor() {
    this.atividade={nome:"",prazo:"",agenda:false,colaboradores:[] }
  }
  criarAtividade(){
    console.log(this.atividade);
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
