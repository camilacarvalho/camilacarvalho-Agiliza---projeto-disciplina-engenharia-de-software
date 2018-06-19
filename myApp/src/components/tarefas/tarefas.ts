import { Component } from '@angular/core';
import { PopoverController } from 'ionic-angular';
import { AddAtividadeComponent } from '../add-atividade/add-atividade';

@Component({
  selector: 'tarefas',
  templateUrl: 'tarefas.html'
})
export class TarefasComponent {

  constructor(public popoverCtrl: PopoverController) {
  
  }
  addAtividade(myEvent){
    let popover = this.popoverCtrl.create(AddAtividadeComponent);
    popover.present({
      ev: myEvent
    });
    popover.onDidDismiss(popoverDate => {
      console.log(popoverDate);
    });
  }
}
