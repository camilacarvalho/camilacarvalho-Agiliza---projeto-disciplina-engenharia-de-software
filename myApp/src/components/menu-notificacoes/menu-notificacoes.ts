import { Component } from '@angular/core';

/**
 * Generated class for the MenuNotificacoesComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'menu-notificacoes',
  templateUrl: 'menu-notificacoes.html'
})
export class MenuNotificacoesComponent {

  text: string;

  constructor() {
    console.log('Hello MenuNotificacoesComponent Component');
    this.text = 'Hello World';
  }

}
