import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'tipo-componente',
        loadChildren: () => import('./tipo-componente/tipo-componente.module').then(m => m.NimbusTipoComponenteModule)
      },
      {
        path: 'componente',
        loadChildren: () => import('./componente/componente.module').then(m => m.NimbusComponenteModule)
      },
      {
        path: 'seccion',
        loadChildren: () => import('./seccion/seccion.module').then(m => m.NimbusSeccionModule)
      },
      {
        path: 'ejercicio',
        loadChildren: () => import('./ejercicio/ejercicio.module').then(m => m.NimbusEjercicioModule)
      },
      {
        path: 'calificacion',
        loadChildren: () => import('./calificacion/calificacion.module').then(m => m.NimbusCalificacionModule)
      },
      {
        path: 'curso',
        loadChildren: () => import('./curso/curso.module').then(m => m.NimbusCursoModule)
      },
      {
        path: 'paquete',
        loadChildren: () => import('./paquete/paquete.module').then(m => m.NimbusPaqueteModule)
      },
      {
        path: 'tipo-actividad',
        loadChildren: () => import('./tipo-actividad/tipo-actividad.module').then(m => m.NimbusTipoActividadModule)
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ]
})
export class NimbusEntityModule {}
