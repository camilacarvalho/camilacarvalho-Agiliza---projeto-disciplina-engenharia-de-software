import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-perfil-usuario',
  templateUrl: 'perfil-usuario.html',
})
export class PerfilUsuarioPage {
  private usuario: any;
  private novo_usuario: any;
  private editar: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController) {
    
    this.usuario = {
      nome: "Camila Carvalho da Silva",
      cargo: "Estudante de Ciência da Computação na UFCG",
      cidade: "Campina Grande", pais: "Brasil", telefone: "+55 83 55555 5555",
      email: "camila.silva@ccc.ufcg.edu.br", bio: "Gosto de desenvolvimento mobile, empreendedorismo e cachorros."
    };

    this.novo_usuario = { nome: this.usuario.nome, cargo: this.usuario.cargo, cidade: this.usuario.cidade, pais: this.usuario.pais, telefone: this.usuario.telefone, email: this.usuario.email, bio: this.usuario.bio };
    this.editar = true;
  }
  cancelar() {
    this.novo_usuario.nome = this.usuario.nome;
    this.novo_usuario.cargo = this.usuario.cargo;
    this.novo_usuario.cidade = this.usuario.cidade;
    this.novo_usuario.pais = this.usuario.pais;
    this.novo_usuario.telefone = this.usuario.telefone;
    this.novo_usuario.email = this.usuario.email;
    this.novo_usuario.bio = this.usuario.bio;
    this.editar = true;
  }
  salvar() {
    if (this.camposVazios() == false) {
      this.usuario.nome = this.novo_usuario.nome;
      this.usuario.cargo = this.novo_usuario.cargo;
      this.usuario.cidade = this.novo_usuario.cidade;
      this.usuario.pais = this.novo_usuario.pais;
      this.usuario.telefone = this.novo_usuario.telefone;
      this.usuario.email = this.novo_usuario.email;
      this.usuario.bio = this.novo_usuario.bio;
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
  camposVazios() {
    if ((this.novo_usuario.nome.trim() == "")
      ||(this.novo_usuario.cargo.trim() == "")
      || (this.novo_usuario.cidade.trim() == "")
      || (this.novo_usuario.pais.trim() == "")
      || (this.novo_usuario.email.trim() == "")) {
      this.presentToast("Preencha todos os campos!");
      return true;
    }
    return false;
  }

}