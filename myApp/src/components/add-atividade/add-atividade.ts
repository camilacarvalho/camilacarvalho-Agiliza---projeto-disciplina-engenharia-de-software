import { Component } from '@angular/core';
import { ToastController } from 'ionic-angular';

@Component({
  selector: 'add-atividade',
  templateUrl: 'add-atividade.html'
})
export class AddAtividadeComponent {


  private atividade: any;
  private data_atual;
  private busca_colaborador: string = "";
  private colaboradores = [];
  private colaborador: any;

  constructor(public toastCtrl: ToastController) {
    this.listaColaboradores();
    this.colaborador = { nome: "", email: "", imagem: "" }
    this.atividade = { nome: "", prazo: "", agenda: false, colaboradores_atv: [] }
  }

  colaboradorExiste(nome): boolean {
    let achou = false;
    this.colaboradores.forEach(col => {
      if (col.nome.toLowerCase() == nome.toLowerCase()) {
        achou = true;
      }
    });
    return achou;
  }

  colaboradorNaoAdicionado(colaborador): boolean {
    let achei = true;
    this.atividade.colaboradores_atv.forEach(col => {
      if (col.nome.toLowerCase() == colaborador.nome.toLowerCase()) {
        achei = false;
      }
    });
    return achei;
  }

  getColaborador(nome) {
    let colaborador;
    if (this.colaboradorExiste(nome)) {
      this.colaboradores.forEach(col => {
        if (col.nome.toLowerCase() == nome.toLowerCase()) {
          colaborador = col;
        }
      });
      return colaborador;
    }
  }

  adicionarColaborador() {
    let col = this.getColaborador(this.busca_colaborador);
    if (col != null && this.colaboradorNaoAdicionado(col)) {
      this.atividade.colaboradores_atv.push(col);
    } else if(this.busca_colaborador.trim()==""){
      this.informacao("Preencha o campo com o nome do colaborador!");
    }else if(col == null){
      this.informacao(this.busca_colaborador + " não faz parte do seu projeto.");
    }

    this.busca_colaborador = "";
  }

  criarAtividade() {
    if (this.camposValidos() == true) {
      this.informacao("Alterações salvas!");
      console.log(this.atividade);
      this.limparCampos();
    }
  }

  informacao(mensagem) {
    let toast = this.toastCtrl.create({
      message: mensagem,
      duration: 3000
    });
    toast.present();
  }

  camposValidos() {
    if (this.atividade.nome.trim() == "") {
      this.informacao("Preencha com o nome da atividade!");
      return false;
    } else if ((this.atividade.nome.trim() == "") || (this.atividade.prazo.trim() == "") || (this.atividade.colaboradores_atv.length == 0)) {
      this.informacao("Preencha todos os campos!");
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

  limparCampos() {
    this.atividade = { nome: "", prazo: "", agenda: false, colaboradores_atv: [] }
  }

  listaColaboradores() {
    this.colaborador = { nome: "Camila", email: "camila.silva@ccc.ufcg.edu.br", imagem: "assets/imgs/img_padrao_projeto.png" }
    this.colaboradores.push(this.colaborador);
    this.colaborador = { nome: "Samara", email: "samara.sampaio@ccc.ufcg.edu.br", imagem: "assets/imgs/img_padrao_projeto.png" }
    this.colaboradores.push(this.colaborador);
    this.colaborador = { nome: "Pedro", email: "pedro.braga@ccc.ufcg.edu.br", imagem: "assets/imgs/img_padrao_projeto.png" }
    this.colaboradores.push(this.colaborador);
    this.colaborador = { nome: "Anderson", email: "anderson.vital@ccc.ufcg.edu.br", imagem: "assets/imgs/img_padrao_projeto.png" }
    this.colaboradores.push(this.colaborador);
    this.colaborador = { nome: "Aramis", email: "aramis.araujo@ccc.ufcg.edu.br", imagem: "assets/imgs/img_padrao_projeto.png" }
    this.colaboradores.push(this.colaborador);
    this.colaborador = { nome: "José Ivan", email: "jose.ivan.junior@ccc.ufcg.edu.br", imagem: "assets/imgs/img_padrao_projeto.png" }
    this.colaboradores.push(this.colaborador);
    this.colaborador = { nome: "Gabriel", email: "gabriel.alves@ccc.ufcg.edu.br", imagem: "assets/imgs/img_padrao_projeto.png" }
    this.colaboradores.push(this.colaborador);
    this.colaborador = { nome: "Bruno", email: "bruno.silva@ccc.ufcg.edu.br", imagem: "assets/imgs/img_padrao_projeto.png" }
    this.colaboradores.push(this.colaborador);
    this.colaborador = { nome: "Lucas", email: "lucas.christopher.silva@ccc.ufcg.edu.br", imagem: "assets/imgs/img_padrao_projeto.png" }
    this.colaboradores.push(this.colaborador);
    this.colaborador = { nome: "Sheilla", email: "sheilla.silva@ccc.ufcg.edu.br", imagem: "assets/imgs/img_padrao_projeto.png" }
    this.colaboradores.push(this.colaborador);
    console.log(this.colaboradores)

  }

}
