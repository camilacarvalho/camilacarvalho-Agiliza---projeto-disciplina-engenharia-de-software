import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { DatePicker } from '@ionic-native/date-picker';
import { AngularFirestore } from 'angularfire2/firestore';
import firebase from '@firebase/app';

@IonicPage()
@Component({
  selector: 'page-novo-projeto',
  templateUrl: 'novo-projeto.html',
})
export class NovoProjetoPage {

  private novoProjeto : FormGroup;
  private userUid: String;

  constructor ( public navCtrl: NavController,
    public navParams: NavParams,
    private formBuilder: FormBuilder,
    private datePicker: DatePicker,
    private afs: AngularFirestore ) {
    
    this.userUid = firebase.auth().currentUser.uid;
    
    this.novoProjeto = this.formBuilder.group({
        nome: ['', Validators.required],
        descricao: ['', Validators.required],
        dataTermino: ['', Validators.required],
    });
  }

  pickDate(){
    this.datePicker.show({
      date: new Date(),
      mode: 'date',
      minDate: new Date(),
      androidTheme: this.datePicker.ANDROID_THEMES.THEME_DEVICE_DEFAULT_LIGHT
    }).then( date => this.novoProjeto.patchValue({dataTermino: date}),
     err=> console.log("Date picker error at project creation: ", err));
  }



  saveProject() {

    const newProject = {
      collaborators:{},
      description: this.novoProjeto.get("descricao").value,
      isPrivate: false,
      ownerId: this.userUid,
      projectName: this.novoProjeto.get("nome").value,
      thumbnail: ""
    }

    this.navCtrl.pop();
    return this.afs.collection('projects').add(newProject);
  }

  cancel() {
    this.navCtrl.pop();
  }

}
