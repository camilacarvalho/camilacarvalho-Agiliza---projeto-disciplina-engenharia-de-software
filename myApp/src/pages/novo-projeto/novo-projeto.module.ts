import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NovoProjetoPage } from './novo-projeto';

@NgModule({
  declarations: [
    NovoProjetoPage,
  ],
  imports: [
    IonicPageModule.forChild(NovoProjetoPage),
  ],
})
export class NovoProjetoPageModule {}
