import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'jhi-sum',
  templateUrl: './sum.component.html',
  styleUrls: ['./sum.component.scss']
})
export class SumComponent implements OnInit {

	// Parámetros
	info = {
	leyenda: "Suma",
	indicacion: {
	nru: "Realiza la siguiente suma:",
	nom: "Selecciona el resultado de la siguiente suma:",
	iru: "Escribe la cantidad necesaria para que la operación sea correcta.",
	iom: "Selecciona la cantidad necesaria para que la operación sea correcta."
	},
	tipo: "a"
	};
	params = {
		operandos: 2,
		resultadoMaximo: 33,
		decimales: 0,
		decimalMaximo: 0,
		drangoDeDistractores: 5,
		multiplosDeCien: false
	};
	cantidadDeEjercicios = 5;
	// Sumas
	tiposOperacion = [];
	decimalesMaximos = this.params.decimalMaximo;
	ejercicios = [];
	cantidadDeDistractores = 3;
	objectKeys = Object.keys;
	respuestasCorrectas = 0;
	calificacion = 0;
	// Paginación
	paginas = {};
	paginaActiva = -1;

  constructor() { }

  ngOnInit() {
	this.crearPaginacion(this.cantidadDeEjercicios)
	if(this.params.multiplosDeCien){
		// Definir tipos de suma (tipo de actividad interactiva)
		this.tiposOperacion = [
		"nru",	// Normal - Respuesta única
		"iru", 	// Invertida - Respuesta única
		];
	}
	else{
		this.tiposOperacion = [
		"nru",	// Normal - Respuesta única
		"nom",	// Normal - Opción múltiple
		"iru", 	// Invertida - Respuesta única
		"iom"	// Invertida - Opción múltiple
		];
	}

    for(let i = 0; i < this.cantidadDeEjercicios; i++){
			// Tipo de suma aleatorio
			const tipoDeSuma = this.tiposOperacion[this.numeroAleatorio(0, this.tiposOperacion.length - 1, 0, 0)];
			let resultado = 0;
			// Obtener sumandos solicitados
      const sumandos = [];
      let numeroTemporal;
			for(let j = 0; j < this.params.operandos; j++){
				if(j === 0){
					numeroTemporal = this.numeroAleatorio(1, Math.floor(this.params.resultadoMaximo) * 0.6,
						(this.params.decimales === 1 ? this.params.decimalMaximo : 0), 
					0);
				}
				else{
					/*
					let numeroTemporal = this.numeroAleatorio(1, Math.floor(this.params.resultadoMaximo) - resultado,
						(this.params.decimales === 1 ? this.params.decimalMaximo : 0), 
					0);
					*/
					numeroTemporal = this.numeroAleatorio(
						1,
						Math.floor(this.params.resultadoMaximo) - resultado < this.params.resultadoMaximo * 0.6 ? Math.floor(this.params.resultadoMaximo) - resultado : this.params.resultadoMaximo * 0.6,
						(this.params.decimales === 1 ? this.params.decimalMaximo : 0), 
						0
					);
				}
				numeroTemporal += this.params.decimalMaximo > 0 ? (1 / Math.pow(10, this.params.decimalMaximo)) : 0;
				// Si es operando es decimal, ajustar cantidad de decimales
				if(!isNaN(numeroTemporal) && !Number.isInteger(numeroTemporal)){
					numeroTemporal = parseFloat(numeroTemporal.toFixed(this.params.decimalMaximo));
				}
				// Múltiplos de 100
				if(this.params.multiplosDeCien){
					numeroTemporal = numeroTemporal - (numeroTemporal % 100);
				}
				sumandos.push(numeroTemporal.toString());
				resultado = parseFloat((resultado + numeroTemporal).toFixed(this.params.decimalMaximo).toString());
			};
			// Objeto suma
			this.ejercicios[i] = {
				tipo: tipoDeSuma,
				resultado,
				operandos: sumandos,
				respuestas: {},
				indicacion: this.info.indicacion[tipoDeSuma],
				modeloResultado: [],
				retro: false,
				calificada: false,
				respuesta: ""
			}
			// Asignar videos
			switch(tipoDeSuma){
				case "nom":
					this.ejercicios[i].videoURL = "sum_dir_om.mp4"
					break;
				case "nru":
					this.ejercicios[i].videoURL = "sum_dir_uni.mp4"
					break;
				case "iom":
					this.ejercicios[i].videoURL = "sum_inv_om.mp4"
					break;
				case "iru":
					this.ejercicios[i].videoURL = "sum_inv_uni.mp4"
					break;
			}
			let resultadoTemporal;
			// Resultado de acuerdo al tipo
			if(tipoDeSuma === "nru" || tipoDeSuma === "nom"){

				// this.ejercicios[i].digitosResultado = resultado.toString().split("");
				resultadoTemporal = resultado.toString();
			}
			else{
				resultadoTemporal = sumandos[sumandos.length -1].toString();
			}
			this.ejercicios[i].digitosResultado = resultadoTemporal.split("");
			// Crear modelo y agregar puntuación
			this.ejercicios[i].modeloResultado = new Array(this.ejercicios[i].digitosResultado.length)
			for(let j = 0; j < this.ejercicios[i].digitosResultado.length; j++){
				if(this.ejercicios[i].digitosResultado[j] === "," || this.ejercicios[i].digitosResultado[j] === "."){
					this.ejercicios[i].modeloResultado[j] = this.ejercicios[i].digitosResultado[j];
				}
				else{
					this.ejercicios[i].modeloResultado[j] = "";
				}
			}
			// Respuesta única
			if(tipoDeSuma === "nru" || tipoDeSuma === "iru"){
				this.ejercicios[i].botones = ['enviar'];
			}
			// Opción múltiple
			else{
				this.ejercicios[i].botones = [''];
				let numeroRango;
				if(tipoDeSuma === "nom"){
					numeroRango = resultado;
				}
				if(tipoDeSuma === "iom"){
					numeroRango = sumandos[sumandos.length -1];
				}				
				// Gererar distractores
				this.ejercicios[i]["respuestas"] = this.generarDistractores(numeroRango, this.cantidadDeDistractores, this.params.drangoDeDistractores);
			}
    }
  }

	crearPaginacion(cantidadDeEjercicios) {
		for (let i = 0; i < cantidadDeEjercicios; i++) {
			this.paginas[i] = "";
			this.ejercicios[i] = {};
		}
		this.paginaActiva = 0;
	}

	cambiarPagina = function(pagina) {
		this.paginaActiva = pagina;
	}

  numeroAleatorio(min: number, max: number, decimales: number, negativos: number) {
    let valor = 1;
    for (let i = 0; i < decimales; i++) {
        valor = valor * 10;
    }
    if (negativos === 0) {
        min < 0 ? min = 0 : min;
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
    const incisos = ["A", "B", "C", "D"];
    const respuestas = [resultadoRecibido];
    const objetoRespuestas = {};
    const resultado = Number(resultadoRecibido);
    let numero;
    let indiceTemporal;
    for (let i = 0; i < cantidad; i++) {
        numero = this.numeroAleatorio(resultado - rango, resultado + rango, (this.params.decimales === 1 ? this.params.decimalMaximo : 0), 0);
        while (this.existeElementoEnArreglo(respuestas, numero)) {
            numero = this.numeroAleatorio(resultado - rango, resultado + rango, (this.params.decimales === 1 ? this.params.decimalMaximo : 0), 0);
        }
        respuestas.push(numero);
    }
    for (let i = 0; i < incisos.length; i++) {
        objetoRespuestas[incisos[i]] = {};
        indiceTemporal = this.numeroAleatorio(0, respuestas.length - 1, 0, 0);
        objetoRespuestas[incisos[i]]['valor'] = respuestas[indiceTemporal];
        // objetoRespuestas[incisos[i]]['clicked'] = false;
        if (respuestas[indiceTemporal] === resultado) {
            objetoRespuestas[incisos[i]]["correcta"] = true;
        } else {
            objetoRespuestas[incisos[i]]["correcta"] = false;
        }
        respuestas.splice(indiceTemporal, 1);
    }
    return objetoRespuestas;
  }

	calificar() {
		let correcta;
		let camposVacios = false;
		// Respuesta única
		if(this.ejercicios[this.paginaActiva].tipo === "nru" || this.ejercicios[this.paginaActiva].tipo === "iru") {
			// Verificar campos vacíos
			for (let i = 0; i < this.ejercicios[this.paginaActiva].modeloResultado.length; i++) {
				if(this.ejercicios[this.paginaActiva].modeloResultado[i] === "" || this.ejercicios[this.paginaActiva].modeloResultado[i] === undefined) {
					camposVacios = true;
				}
			}
			if(!camposVacios) {
				this.ejercicios[this.paginaActiva].calificada = true;
				// Respuesta única
				if (this.ejercicios[this.paginaActiva]) {
					correcta = this.compararArreglosRespuestas(this.ejercicios[this.paginaActiva].modeloResultado, this.ejercicios[this.paginaActiva].digitosResultado);
				}
				// Opción múltiple
				else {
					correcta = this.ejercicios[this.paginaActiva].respuesta === this.ejercicios[this.paginaActiva].resultado;
				}
			}
		}
		// Opción múltiple
		else {
			this.ejercicios[this.paginaActiva].calificada = true;
			let respuestaRevisar;
			// Normal
			if (this.ejercicios[this.paginaActiva].tipo == "nom") {
				respuestaRevisar = this.ejercicios[this.paginaActiva].resultado;
			}
			// invertida
			else {
				respuestaRevisar = this.ejercicios[this.paginaActiva].operandos[this.ejercicios[this.paginaActiva].operandos.length - 1];
			}
			if (this.ejercicios[this.paginaActiva].respuesta == respuestaRevisar) {
				correcta = true;
			}
		}
		// Correcta
		if (!camposVacios) {
			if (correcta) {
				this.respuestasCorrectas = this.respuestasCorrectas + 1;
			}
			this.ejercicioSinResponder();
		}
	}

	compararArreglosRespuestas(respuestas, resultados) {
		let iguales = true;
		for (let i = 0; i < resultados.length; i++) {
			if (respuestas[i] !== Number(resultados[i])) {
				iguales = false;
			}
		}
		return iguales;
	}

	ejercicioSinResponder = function() {
		let ejerciciosSinResponder = false;
		for(let i = 0; i < this.cantidadDeEjercicios; i++) {
			if(this.ejercicios[i].calificada === false) {
				ejerciciosSinResponder = true;
				break;
			}
		}
		if(!ejerciciosSinResponder){
			this.calificacion = this.respuestasCorrectas / this.cantidadDeEjercicios * 10;
		}
	}

}
