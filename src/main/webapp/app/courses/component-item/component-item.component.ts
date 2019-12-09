import { Component, OnInit, Input, ViewChild, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
import { SumComponent } from '../practitioner/sum/sum.component';
import { ComponentTemplateBaseComponent } from '../component-template-base/component-template-base.component';

@Component({
  selector: 'jhi-component-item',
  templateUrl: './component-item.component.html',
  styleUrls: ['./component-item.component.scss']
})
export class ComponentItemComponent implements OnInit {
  @Input() data: any;
  @ViewChild('container', { static: true, read: ViewContainerRef }) private container: ViewContainerRef;
  readonly templateMapper = {
    sum: SumComponent
  };

  constructor(private componentFactoryResolver: ComponentFactoryResolver) {}

  ngOnInit() {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(
      this.getComponentForComponentType(this.data.InteractiveActivityType)
    );
    console.log(this.container);
    console.log(typeof this.container);
    const viewContainerRef = this.container;
    viewContainerRef.clear();
    const componentRef = viewContainerRef.createComponent(componentFactory);
    (componentRef.instance as ComponentTemplateBaseComponent).data = this.data;
  }

  private getComponentForComponentType(nombreComponente) {
    return this.templateMapper[nombreComponente];
  }
}
