import { NgModule } from '@angular/core';
import { GoogleLoginComponent } from './google-login/google-login';
import { TarefasComponent } from './tarefas/tarefas';
import { ColaboradoresComponent } from './colaboradores/colaboradores';
import { GraficosComponent } from './graficos/graficos';
import { SobreComponent } from './sobre/sobre';
@NgModule({
	declarations: [GoogleLoginComponent,
    TarefasComponent,
    ColaboradoresComponent,
    GraficosComponent,
    SobreComponent],
	imports: [],
	exports: [GoogleLoginComponent,
    TarefasComponent,
    ColaboradoresComponent,
    GraficosComponent,
    SobreComponent]
})
export class ComponentsModule {}
