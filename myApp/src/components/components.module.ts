import { NgModule } from '@angular/core';
import { GoogleLoginComponent } from './google-login/google-login';
import { TarefasComponent } from './tarefas/tarefas';
import { ColaboradoresComponent } from './colaboradores/colaboradores';
import { GraficosComponent } from './graficos/graficos';
import { SobreComponent } from './sobre/sobre';
import { AddAtividadeComponent } from './add-atividade/add-atividade';
import { MenuNotificacoesComponent } from './menu-notificacoes/menu-notificacoes';
@NgModule({
	declarations: [GoogleLoginComponent,
    TarefasComponent,
    ColaboradoresComponent,
    GraficosComponent,
    SobreComponent,
    AddAtividadeComponent,
    MenuNotificacoesComponent],
	imports: [],
	exports: [GoogleLoginComponent,
    TarefasComponent,
    ColaboradoresComponent,
    GraficosComponent,
    SobreComponent,
    AddAtividadeComponent,
    MenuNotificacoesComponent]
})
export class ComponentsModule {}
