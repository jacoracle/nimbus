import { Component, OnInit, Input, Output, ElementRef, QueryList, ViewChildren, AfterViewInit, ViewChild } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { ComponentTemplateBaseComponent } from 'app/courses/component-template-base/component-template-base.component';

@Component({
  selector: 'jhi-sum',
  templateUrl: './sum.component.html',
  styleUrls: ['./sum.component.scss']
})
export class SumComponent extends ComponentTemplateBaseComponent implements OnInit, AfterViewInit {
  // Parámetros
  info = {
    leyenda: 'Suma',
    indicacion: {
      nru: 'Realiza la siguiente suma:',
      iru: 'Escribe la cantidad necesaria para que la operación sea correcta.'
    },
    tipo: 'a'
  };
  params = {
    operandos: 2,
    resultadoMaximo: 33,
    decimales: 0,
    decimalMaximo: 0,
    drangoDeDistractores: 5,
    multiplosDeCien: false
  };
  // Sumas
  ejercicio;
  digitosResultado;
  modeloResultado;
  @ViewChildren('focus') focus: QueryList<ElementRef>;
  tiposOperacion = [];
  decimalesMaximos = this.params.decimalMaximo;
  cantidadDeDistractores = 3;
  objectKeys = Object.keys;
  respuestaCorrecta;
  calificacionActividad = 0;
  sumIndex;
  @Output()
  ejercicioCalificado: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild('search', { static: false }) searchElement: ElementRef;
  @Input() data;

  showSearch() {
    setTimeout(() => {
      // this will make the execution after the above boolean has changed
      this.focus.forEach(function(value) {
        console.log(value);
      });
      // this.focus.forEach((element, index) => console.log(element));
      /*
		console.log(this.searchElement);
		console.log(this.searchElement.nativeElement);
		console.log(this.searchElement.nativeElement.focus());
		*/
    }, 0);
  }

  ngOnInit() {
    console.log(this.data);
    this.sumIndex = this.data.indiceEjercicio;
    if (this.params.multiplosDeCien) {
      // Definir tipos de suma (tipo de actividad interactiva)
      this.tiposOperacion = [
        'nru', // Normal - Respuesta única
        'iru' // Invertida - Respuesta única
      ];
    } else {
      this.tiposOperacion = [
        'nru', // Normal - Respuesta única
        'iru' // Invertida - Respuesta única
      ];
    }

    // Tipo de suma aleatorio
    const tipoDeSuma = this.tiposOperacion[this.numeroAleatorio(0, this.tiposOperacion.length - 1, 0, 0)];
    let resultado = 0;
    // Obtener sumandos solicitados
    const sumandos = [];
    let numeroTemporal;
    for (let j = 0; j < this.params.operandos; j++) {
      if (j === 0) {
        numeroTemporal = this.numeroAleatorio(
          1,
          Math.floor(this.params.resultadoMaximo) * 0.6,
          this.params.decimales === 1 ? this.params.decimalMaximo : 0,
          0
        );
      } else {
        /*
				let numeroTemporal = this.numeroAleatorio(1, Math.floor(this.params.resultadoMaximo) - resultado,
					(this.params.decimales === 1 ? this.params.decimalMaximo : 0), 
				0);
				*/
        numeroTemporal = this.numeroAleatorio(
          1,
          Math.floor(this.params.resultadoMaximo) - resultado < this.params.resultadoMaximo * 0.6
            ? Math.floor(this.params.resultadoMaximo) - resultado
            : this.params.resultadoMaximo * 0.6,
          this.params.decimales === 1 ? this.params.decimalMaximo : 0,
          0
        );
      }
      numeroTemporal += this.params.decimalMaximo > 0 ? 1 / Math.pow(10, this.params.decimalMaximo) : 0;
      // Si es operando es decimal, ajustar cantidad de decimales
      if (!isNaN(numeroTemporal) && !Number.isInteger(numeroTemporal)) {
        numeroTemporal = parseFloat(numeroTemporal.toFixed(this.params.decimalMaximo));
      }
      // Múltiplos de 100
      if (this.params.multiplosDeCien) {
        numeroTemporal = numeroTemporal - (numeroTemporal % 100);
      }
      sumandos.push(numeroTemporal.toString());
      resultado = parseFloat((resultado + numeroTemporal).toFixed(this.params.decimalMaximo).toString());
    }
    // Objeto suma
    this.ejercicio = {
      tipo: tipoDeSuma,
      resultado,
      operandos: sumandos,
      respuestas: {},
      indicacion: this.info.indicacion[tipoDeSuma],
      retro: false,
      calificada: false,
      respuesta: ''
    };
    // Asignar videos
    switch (tipoDeSuma) {
      case 'nom':
        this.ejercicio.videoURL = 'sum_dir_om.mp4';
        break;
      case 'nru':
        this.ejercicio.videoURL = 'sum_dir_uni.mp4';
        break;
      case 'iom':
        this.ejercicio.videoURL = 'sum_inv_om.mp4';
        break;
      case 'iru':
        this.ejercicio.videoURL = 'sum_inv_uni.mp4';
        break;
    }
    let resultadoTemporal;
    // Resultado de acuerdo al tipo
    if (tipoDeSuma === 'nru' || tipoDeSuma === 'nom') {
      // this.digitosResultado = resultado.toString().split("");
      resultadoTemporal = resultado.toString();
    } else {
      resultadoTemporal = sumandos[sumandos.length - 1].toString();
    }
    this.digitosResultado = resultadoTemporal.split('');
    // Crear modelo y agregar puntuación
    this.modeloResultado = new Array(this.digitosResultado.length);
    for (let j = 0; j < this.digitosResultado.length; j++) {
      if (this.digitosResultado[j] === ',' || this.digitosResultado[j] === '.') {
        this.modeloResultado[j] = {
          valor: this.digitosResultado[j],
          campo: this.digitosResultado.length - 1 - j
        };
      } else {
        this.modeloResultado[j] = {
          valor: '',
          campo: this.digitosResultado.length - 1 - j
        };
      }
    }
    // Respuesta única
    if (tipoDeSuma === 'nru' || tipoDeSuma === 'iru') {
      this.ejercicio.botones = ['enviar'];
    }
    // Opción múltiple
    else {
      this.ejercicio.botones = [''];
      let numeroRango;
      if (tipoDeSuma === 'nom') {
        numeroRango = resultado;
      }
      if (tipoDeSuma === 'iom') {
        numeroRango = sumandos[sumandos.length - 1];
      }
      // Gererar distractores
      this.ejercicio['respuestas'] = this.generarDistractores(numeroRango, this.cantidadDeDistractores, this.params.drangoDeDistractores);
    }
  }

  ngAfterViewInit() {
    this.focus.changes.subscribe(() => {
      console.log('changes');
      console.log(this);
      // this.focus.last.nativeElement.focus();
    });
  }

  cambiarFocus() {
    /*
		this.focus.forEach(function(value){
			console.log(value);
		})
		*/
    for (let i = 0; i < this.modeloResultado.length; i++) {
      for (let j = 0; j < this.modeloResultado.length; j++) {
        if (this.modeloResultado[j].campo === i && this.modeloResultado[j].valor === '') {
          console.log('focus en ' + j);
          console.log(this.modeloResultado[j]);
          // console.log(this.modeloResultado[j].nativeElement);
          setTimeout(() => {
            // this will make the execution after the above boolean has changed
            // this.modeloResultado[j].nativeElement.focus();
            this.focus.forEach((element, index) => (index === j ? element.nativeElement.focus() : false));
          }, 1000);
          break;
        }
      }
    }
  }

  numeroAleatorio(min: number, max: number, decimales: number, negativos: number) {
    let valor = 1;
    for (let i = 0; i < decimales; i++) {
      valor = valor * 10;
    }
    if (negativos === 0) {
      min < 0 ? (min = 0) : min;
    }
    return Math.floor(valor * (Math.random() * (max - min + 1) + min)) / valor;
  }

  existeElementoEnArreglo(arreglo, elemento) {
    let existe = false;
    for (let i = 0; i < arreglo.length; i++) {
      if (arreglo[i] === elemento) {
        existe = true;
        break;
      }
    }
    return existe;
  }

  generarDistractores(resultadoRecibido, cantidad, rango) {
    const incisos = ['A', 'B', 'C', 'D'];
    const respuestas = [resultadoRecibido];
    const objetoRespuestas = {};
    const resultado = Number(resultadoRecibido);
    let numero;
    let indiceTemporal;
    for (let i = 0; i < cantidad; i++) {
      numero = this.numeroAleatorio(resultado - rango, resultado + rango, this.params.decimales === 1 ? this.params.decimalMaximo : 0, 0);
      while (this.existeElementoEnArreglo(respuestas, numero)) {
        numero = this.numeroAleatorio(resultado - rango, resultado + rango, this.params.decimales === 1 ? this.params.decimalMaximo : 0, 0);
      }
      respuestas.push(numero);
    }
    for (let i = 0; i < incisos.length; i++) {
      objetoRespuestas[incisos[i]] = {};
      indiceTemporal = this.numeroAleatorio(0, respuestas.length - 1, 0, 0);
      objetoRespuestas[incisos[i]]['valor'] = respuestas[indiceTemporal];
      // objetoRespuestas[incisos[i]]['clicked'] = false;
      if (respuestas[indiceTemporal] === resultado) {
        objetoRespuestas[incisos[i]]['correcta'] = true;
      } else {
        objetoRespuestas[incisos[i]]['correcta'] = false;
      }
      respuestas.splice(indiceTemporal, 1);
    }
    return objetoRespuestas;
  }

  calificar() {
    let correcta;
    let camposVacios = false;
    // Respuesta única
    if (this.ejercicio.tipo === 'nru' || this.ejercicio.tipo === 'iru') {
      // Verificar campos vacíos
      for (let i = 0; i < this.modeloResultado.length; i++) {
        if (this.modeloResultado[i].valor === '' || this.modeloResultado[i].valor === undefined) {
          camposVacios = true;
        }
      }
      if (!camposVacios) {
        this.ejercicio.calificada = true;
        // Respuesta única
        if (this.ejercicio) {
          correcta = this.compararArreglosRespuestas(this.modeloResultado, this.digitosResultado);
        }
        // Opción múltiple
        else {
          correcta = this.ejercicio.respuesta === this.ejercicio.resultado;
        }
      }
    }
    // Opción múltiple
    else {
      this.ejercicio.calificada = true;
      let respuestaRevisar;
      // Normal
      if (this.ejercicio.tipo === 'nom') {
        respuestaRevisar = this.ejercicio.resultado;
      }
      // invertida
      else {
        respuestaRevisar = this.ejercicio.operandos[this.ejercicio.operandos.length - 1];
      }
      if (this.ejercicio.respuesta === respuestaRevisar) {
        correcta = true;
      }
    }
    // Correcta
    if (!camposVacios) {
      if (correcta) {
        this.respuestaCorrecta = true;
      } else {
        this.respuestaCorrecta = false;
      }
      console.log(this.ejercicio.calificada);
      console.log(this.sumIndex);
      console.log(correcta ? 10 : 0);
      this.ejercicioCalificado.emit({
        calificada: this.ejercicio.calificada,
        indice: this.sumIndex,
        calificacion: correcta ? 10 : 0
      });
    }
  }

  compararArreglosRespuestas(respuestas, resultados) {
    let iguales = true;
    for (let i = 0; i < resultados.length; i++) {
      if (respuestas[i].valor !== Number(resultados[i])) {
        iguales = false;
      }
    }
    return iguales;
  }
}
