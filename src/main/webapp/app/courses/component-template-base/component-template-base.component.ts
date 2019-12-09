import { Component, Input } from '@angular/core';

@Component({
  selector: 'jhi-component-template-base',
  templateUrl: './component-template-base.component.html'
})
export class ComponentTemplateBaseComponent {
  @Input() data: any;
}
