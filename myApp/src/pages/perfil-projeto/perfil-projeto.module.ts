import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PerfilProjetoPage } from './perfil-projeto';

@NgModule({
  declarations: [
    PerfilProjetoPage,
  ],
  imports: [
    IonicPageModule.forChild(PerfilProjetoPage),
  ],
})
export class PerfilProjetoPageModule {}
