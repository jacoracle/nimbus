import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'jhi-multiple-choice',
  templateUrl: './multiple-choice.component.html',
  styleUrls: ['./multiple-choice.component.scss']
})
export class MultipleChoiceComponent implements OnInit {
  contenido = {
    indicacion: 'Selecciona la opción correcta.',
    calificada: false,
    preguntas: [
      {
        pregunta: '¿Cuál es la capital de Querétaro?',
        calificada: false,
        tipo_pregunta: 'opcionMultiple',
        marcada: false,
        correcta: false,
        respuestas: [
          { respuesta: 'Peñamiller', correcta: false, seleccionada: false },
          { respuesta: 'Querétaro', correcta: true, seleccionada: false },
          { respuesta: 'Corregidora', correcta: false, seleccionada: false }
        ]
      },
      {
        pregunta: '¿Cuál es el estado más grande de México?',
        calificada: false,
        tipo_pregunta: 'opcionMultiple',
        marcada: false,
        correcta: false,
        respuestas: [
          { respuesta: 'Chihuahua', correcta: true, seleccionada: false },
          { respuesta: 'Sonora', correcta: false, seleccionada: false },
          { respuesta: 'Coahuila', correcta: false, seleccionada: false }
        ]
      },
      {
        pregunta: 'La cuidad con más habitantes del país es:',
        calificada: false,
        tipo_pregunta: 'opcionMultiple',
        marcada: false,
        correcta: false,
        respuestas: [
          { respuesta: 'Monterrey', correcta: false, seleccionada: false },
          { respuesta: 'Cuidad de México', correcta: true, seleccionada: false },
          { respuesta: 'Guadalajara', correcta: false, seleccionada: false }
        ]
      },
      {
        pregunta: 'Los siguientes Estados de la República se encuentran en la frontera con Guatemala:',
        calificada: false,
        tipo_pregunta: 'opcionMultiple',
        marcada: false,
        correcta: false,
        respuestas: [
          { respuesta: 'Chiapas y Oaxaca', correcta: false, seleccionada: false },
          { respuesta: 'Yucatán y Quintana Roo', correcta: false, seleccionada: false },
          { respuesta: 'Campeche y Tabasco', correcta: true, seleccionada: false }
        ]
      },
      {
        pregunta: '¿Con qué países tiene frontera México',
        calificada: false,
        tipo_pregunta: 'opcionMultiple',
        marcada: false,
        correcta: false,
        respuestas: [
          { respuesta: 'Estados Unidos, Honduras y Guatemala', correcta: false, seleccionada: false },
          { respuesta: 'Belice, Estados Unidos y Honduras', correcta: false, seleccionada: false },
          { respuesta: 'Guatemala, Belice y Estados Unidos', correcta: true, seleccionada: false }
        ]
      }
    ],
    mezclar: false
  };
  totalPuntos = 0;
  calificacion = 0;

  constructor() {}

  ngOnInit() {
    for (let i = 0; i < this.contenido.preguntas.length; i++) {
      for (let j = 0; j < this.contenido.preguntas[i].respuestas.length; j++) {
        this.contenido.preguntas[i].respuestas = this.desordenarArreglo(this.contenido.preguntas[i].respuestas);
      }
    }
    this.contenido.preguntas = this.desordenarArreglo(this.contenido.preguntas);
  }

  seleccionar(respuestas, respuesta) {
    for (let i = 0; i < respuestas.length; i++) {
      respuestas[i].seleccionada = false;
    }
    respuesta.seleccionada = !respuesta.seleccionada;
  }

  calificar() {
    // Verificar si todas están respondidas
    for (let i = 0; i < this.contenido.preguntas.length; i++) {
      let contadorRespondida = false;
      this.contenido.preguntas[i].marcada = false;
      for (let j = 0; j < this.contenido.preguntas[i].respuestas.length; j++) {
        if (this.contenido.preguntas[i].respuestas[j].seleccionada) {
          contadorRespondida = true;
        }
      }
      if (!contadorRespondida) {
        this.contenido.preguntas[i].marcada = true;
        return;
      }
    }
    // Calificar
    for (let i = 0; i < this.contenido.preguntas.length; i++) {
      let respondida = false;
      this.contenido.preguntas[i].marcada = false;
      for (let j = 0; j < this.contenido.preguntas[i].respuestas.length; j++) {
        if (this.contenido.preguntas[i].respuestas[j].seleccionada) {
          respondida = true;
          this.contenido.preguntas[i].marcada = false;
        }
        if (this.contenido.preguntas[i].respuestas[j].correcta === true && this.contenido.preguntas[i].respuestas[j].seleccionada) {
          this.contenido.preguntas[i].correcta = true;
          this.totalPuntos++;
          break;
        }
      }
      if (!respondida) {
        this.contenido.preguntas[i].marcada = true;
        return;
      }
      this.contenido.preguntas[i].calificada = true;
    }
    this.calificacion = Math.round((this.totalPuntos / this.contenido.preguntas.length) * 100) / 10;
    this.contenido.calificada = true;
  }

  numeroAleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  clonarObjeto(objeto) {
    return JSON.parse(JSON.stringify(objeto));
  }

  desordenarArreglo(arregloDesordenar) {
    const arregloDesordenado = [];
    while (arregloDesordenar.length > 0) {
      const indiceAleatorio = this.numeroAleatorio(0, arregloDesordenar.length - 1);
      arregloDesordenado.push(this.clonarObjeto(arregloDesordenar[indiceAleatorio]));
      arregloDesordenar.splice(indiceAleatorio, 1);
    }
    return arregloDesordenado;
  }
}
