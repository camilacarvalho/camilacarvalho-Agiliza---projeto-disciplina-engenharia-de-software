import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TarefasComponent } from '../../components/tarefas/tarefas';
import { ColaboradoresComponent } from '../../components/colaboradores/colaboradores';
import { GraficosComponent } from '../../components/graficos/graficos';
import { SobreComponent } from '../../components/sobre/sobre';

/**
 * Generated class for the PerfilProjetoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-projeto',
  templateUrl: 'projeto.html',
})
export class ProjetoPage {
  tab1: any;
  tab2: any;
  tab3: any;
  tab4: any;
  private projeto:any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.tab1 = TarefasComponent;
    this.tab2 = ColaboradoresComponent;
    this.tab3 = GraficosComponent;
    this.tab4 = SobreComponent;

    this.projeto={nome:"Sarrafo"};
  }


}
