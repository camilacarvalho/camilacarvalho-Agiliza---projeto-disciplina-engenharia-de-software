import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GerenciandoPage } from './gerenciando';

@NgModule({
  declarations: [
    GerenciandoPage,
  ],
  imports: [
    IonicPageModule.forChild(GerenciandoPage),
  ],
})
export class GerenciandoPageModule {}
