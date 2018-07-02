import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the GerenciandoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-gerenciando',
  templateUrl: 'gerenciando.html',
})
export class GerenciandoPage {


  projetosSendoGerenciadosObject : Object = [
    {
      nome: "Agiliza",
      descricao: "O Agiliza é um app organizador de projetos",
      dataInicio: "15/06/2018",
      dataTermino: "01/07/2018"
    },
    {
      nome: "MeOrganiza",
      descricao: "O MeOrganiza é um app top vencedor de altos prêmios",
      dataInicio: "15/11/2017",
      dataTermino: "11/01/2018"
    },
  ];


  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  novoProjeto() {
    this.navCtrl.push('NovoProjetoPage');
  }

  buttonProjetoClick() {
    this.navCtrl.push('ProjetoPage');
  }

  loadSettingsPage() {
    this.navCtrl.push('SettingsPage');
  }
}
