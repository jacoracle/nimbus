import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'jhi-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  courses = [
    {
      name: 'Curso de Historia 1',
      author: 'Juan Pérez',
      version: '1.3',
      cover: 'portada1',
      route: 'multiple-choice'
    },
    {
      name: 'Practicario de Matemáticas 1',
      author: 'Juan Pérez',
      version: '1.0',
      cover: 'portada2',
      route: 'practitioner'
    }
  ];

  constructor() {}

  ngOnInit() {}
}
