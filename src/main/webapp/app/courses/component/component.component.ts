import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ICalificacion } from 'app/shared/model/calificacion.model';
import * as moment from 'moment';
import { CalificacionService } from './../../entities/calificacion/calificacion.service';
import { ComponenteService } from './../../entities/componente/componente.service';

@Component({
  selector: 'jhi-component',
  templateUrl: './component.component.html',
  styleUrls: ['./component.component.scss']
})
export class ComponentComponent implements OnInit {
  cantidadDeEjercicios = 5;
  ejercicios = [];
  paginas = [];
  paginaActiva = -1;
  calificacionActividad = 0;
  @ViewChild('container', { read: ViewContainerRef, static: false }) private container: ViewContainerRef;
  interactiveActivityTypes = ['sum', 'sumMultipleChoice'];

  constructor(protected calificacionService: CalificacionService, protected componenteService: ComponenteService) {}

  ngOnInit() {
    this.crearPaginacion(this.cantidadDeEjercicios);
    /*
        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.getComponentForFactory("sum"));
        const ViewContainerRef = this.container;
        */
    /*
        ViewContainerRef.clear();
        const componentRef = ViewContainerRef.createComponent(componentFactory);
        (<ComponentTemplateBaseComponent>componentRef.instance).data = this.data;
        */
  }

  public registrarCalificacion(infoEjercicio: any): void {
    this.ejercicios[infoEjercicio.indice].calificada = true;
    this.ejercicios[infoEjercicio.indice].calificacion += infoEjercicio.calificacion;
    this.ejercicioSinResponder();
  }

  crearPaginacion(cantidadDeEjercicios) {
    for (let i = 0; i < cantidadDeEjercicios; i++) {
      this.paginas[i] = {
        seleccionada: i === 0 ? true : false
      };
      this.ejercicios[i] = {
        calificada: false,
        calificacion: 0,
        InteractiveActivityType: this.interactiveActivityTypes[this.numeroAleatorio(0, this.interactiveActivityTypes.length - 1)],
        indiceEjercicio: i
      };
    }
    this.paginaActiva = 0;
  }

  cambiarPagina = function(pagina) {
    for (let i = 0; i < this.cantidadDeEjercicios; i++) {
      this.paginas[i].seleccionada = false;
    }
    this.paginas[pagina].seleccionada = true;
    this.paginaActiva = pagina;
  };

  ejercicioSinResponder = function() {
    // Verificar que no haya ejercicios sin responder
    let ejerciciosSinResponder = false;
    for (let i = 0; i < this.ejercicios.length; i++) {
      if (this.ejercicios[i].calificada === false) {
        this.cambiarPagina(i);
        ejerciciosSinResponder = true;
        break;
      }
    }
    if (!ejerciciosSinResponder) {
      console.log('No hay ejercios sin responder');
      this.calcularCalificacion();
    } else {
      console.log('Hay ejercios sin responder');
    }
  };

  protected calcularCalificacion() {
    let aciertos = 0;
    for (let i = 0; i < this.ejercicios.length; i++) {
      aciertos += this.ejercicios[i].calificacion;
    }
    this.calificacionActividad = (aciertos / this.cantidadDeEjercicios) * 10;
    console.log('Calificación: ' + this.calificacionActividad);
    // Registrar calificación
    const calificacion = {
      score: this.calificacionActividad.toString(),
      monedas: this.calificacionActividad,
      fecha: moment(),
      componente: null
    };
    this.componenteService.find(2).subscribe(val => {
      calificacion.componente = val.body;
      this.subscribeToSaveResponse(this.calificacionService.create(calificacion));
    });
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICalificacion>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {}

  protected onSaveError() {}

  numeroAleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
}
