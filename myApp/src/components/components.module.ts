import { NgModule } from '@angular/core';
import { GoogleLoginComponent } from './google-login/google-login';
import { TarefasComponent } from './tarefas/tarefas';
import { ColaboradoresComponent } from './colaboradores/colaboradores';
import { GraficosComponent } from './graficos/graficos';
import { SobreComponent } from './sobre/sobre';
import { AddAtividadeComponent } from './add-atividade/add-atividade';

@NgModule({
	declarations: [GoogleLoginComponent,
    TarefasComponent,
    ColaboradoresComponent,
    GraficosComponent,
    SobreComponent,
    AddAtividadeComponent],
	imports: [],
	exports: [GoogleLoginComponent,
    TarefasComponent,
    ColaboradoresComponent,
    GraficosComponent,
    SobreComponent,
    AddAtividadeComponent]
})
export class ComponentsModule {}
