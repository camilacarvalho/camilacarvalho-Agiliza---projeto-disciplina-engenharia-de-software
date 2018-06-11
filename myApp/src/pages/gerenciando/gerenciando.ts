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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  novoProjeto() {
    this.navCtrl.setRoot('NovoProjetoPage');
  }

}
