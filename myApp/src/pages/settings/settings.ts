import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  loadPerfilPage() {
    this.navCtrl.push('PerfilUsuarioPage');
  }
  
  loadNotificacoesPage() {
    this.navCtrl.push('NotificacoesPage');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');
  }
}
