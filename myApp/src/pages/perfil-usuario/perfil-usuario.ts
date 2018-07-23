import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import firebase from '@firebase/app';


@IonicPage()
@Component({
  selector: 'page-perfil-usuario',
  templateUrl: 'perfil-usuario.html',
})
export class PerfilUsuarioPage {
  

  
  private novo_usuario: FormGroup;
  private userUid: string;
  private usuario: Observable<any>;


  constructor(
    private camera: Camera,
    private navCtrl: NavController,
    private navParams: NavParams,
    private toastCtrl: ToastController,
    private formBuilder: FormBuilder,
    private afs: AngularFirestore) {

    this.userUid = firebase.auth().currentUser.uid;
    this.usuario = this.getUser();
    this.novo_usuario = this.formBuilder.group({ 
      name: ['', Validators.required],
      img: "assets/imgs/img_padrao_projeto.png",
      occupation: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      phone: ['', Validators.required],
      bio: ['', Validators.required] });
 
  }

  tirarFoto() {
    
    const options: CameraOptions = {
       quality: 100,
       destinationType: this.camera.DestinationType.DATA_URL,
       encodingType: this.camera.EncodingType.JPEG,
       mediaType: this.camera.MediaType.PICTURE   
     }

     return this.camera.getPicture(options).then((imageData) => {
       this.novo_usuario.get("img").setValue('data:image/jpeg;base64,' + imageData);
     }, (err) => { console.log("Camera image capturing error: ",err);
     });
     
   }

   encontrarFoto(){
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY  
    }

    return this.camera.getPicture(options).then((imageData) => {
      this.novo_usuario.get("img").setValue('data:image/jpeg;base64,' + imageData);
    }, (err) => { console.log("Device stored image capturing error: ",err);
    });
   }

  cancelar() {
    this.navCtrl.pop();
  }

  salvar() {
    
    const updatedInfo = {
      name: this.novo_usuario.get("name").value,
      occupation: this.novo_usuario.get("occupation").value,
      city: this.novo_usuario.get("city").value,
      country: this.novo_usuario.get("country").value,
      phone: this.novo_usuario.get("phone").value,
      bio: this.novo_usuario.get("bio").value
    }

    this.presentToast("Alterações salvas!");
    return this.afs.collection('users').doc(this.userUid)
    .update(updatedInfo).catch(err => console.log(err));

  }

  presentToast(mensagem) {
    let toast = this.toastCtrl.create({
      message: mensagem,
      duration: 3000
    });
    toast.present();
  }

  getUser(){
    return this.afs.collection('users').doc(this.userUid).valueChanges();
  }

  ionViewDidLoad(){
   this.usuario = this.getUser();
 
  }

}

