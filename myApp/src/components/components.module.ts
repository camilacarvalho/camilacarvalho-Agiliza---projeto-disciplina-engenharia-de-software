import { NgModule } from '@angular/core';
import { TarefasComponent } from './tarefas/tarefas';
import { ColaboradoresComponent } from './colaboradores/colaboradores';
import { GraficosComponent } from './graficos/graficos';
import { SobreComponent } from './sobre/sobre';
import { AddAtividadeComponent } from './add-atividade/add-atividade';

@NgModule({
	declarations: [
    TarefasComponent,
    ColaboradoresComponent,
    GraficosComponent,
    SobreComponent,
    AddAtividadeComponent],
	imports: [],
	exports: [
    TarefasComponent,
    ColaboradoresComponent,
    GraficosComponent,
    SobreComponent,
    AddAtividadeComponent]
})
export class ComponentsModule {}
