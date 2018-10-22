import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-colaborando',
  templateUrl: 'colaborando.html',
})
export class ColaborandoPage {

  projetosSendoColaboradorObject : Object = [
    {
      nome: "Mememaker",
      descricao: "Uma fábrica de memes",
      dataInicio: "15/06/2018",
      dataTermino: "01/07/2018"
    }
  ];

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  loadSettingsPage() {
    this.navCtrl.push('SettingsPage');
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad ColaborandoPage');
  }

  buttonProjetoClick() {
    this.navCtrl.push('ProjetoPage');
  }
  
}
