import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ActivatedRoute, Router } from '@angular/router';
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';

@Component({
  selector: 'jhi-multiple-choice',
  templateUrl: './multiple-choice.component.html'
})
export class MultipleChoiceComponent implements OnInit, OnDestroy {
  routeData: Subscription;

  constructor(private activatedRoute: ActivatedRoute) {
    this.routeData = this.activatedRoute.data.subscribe(data => {});
  }

  ngOnInit() {}

  ngOnDestroy(): void {}
}
