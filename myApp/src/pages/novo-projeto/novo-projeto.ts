import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-novo-projeto',
  templateUrl: 'novo-projeto.html',
})
export class NovoProjetoPage {

  private novoProjeto : FormGroup;

  constructor ( public navCtrl: NavController, public navParams: NavParams,
    private formBuilder: FormBuilder ) {

    this.novoProjeto = this.formBuilder.group({
        nome: ['', Validators.required],
        descricao: ['', Validators.required],
        dataTermino: [''],
    });
  }

  logForm() {
    console.log(this.novoProjeto.value);
  }

  save() {
    this.navCtrl.pop();
  }

  cancel() {
    this.navCtrl.pop();
  }

}
