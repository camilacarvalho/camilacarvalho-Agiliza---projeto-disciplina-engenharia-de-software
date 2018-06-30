import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-projetos',
  templateUrl: 'projetos.html'
})
export class ProjetosPage {

  gerenciandoRoot = 'GerenciandoPage'
  colaborandoRoot = 'ColaborandoPage'


  constructor(public navCtrl: NavController) {}

}
