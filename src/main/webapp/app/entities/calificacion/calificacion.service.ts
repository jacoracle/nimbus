import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ICalificacion } from 'app/shared/model/calificacion.model';

type EntityResponseType = HttpResponse<ICalificacion>;
type EntityArrayResponseType = HttpResponse<ICalificacion[]>;

@Injectable({ providedIn: 'root' })
export class CalificacionService {
  public resourceUrl = SERVER_API_URL + 'api/calificacions';

  constructor(protected http: HttpClient) {}

  create(calificacion: ICalificacion): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(calificacion);
    return this.http
      .post<ICalificacion>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(calificacion: ICalificacion): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(calificacion);
    return this.http
      .put<ICalificacion>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<ICalificacion>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<ICalificacion[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(calificacion: ICalificacion): ICalificacion {
    const copy: ICalificacion = Object.assign({}, calificacion, {
      fecha: calificacion.fecha != null && calificacion.fecha.isValid() ? calificacion.fecha.toJSON() : null
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.fecha = res.body.fecha != null ? moment(res.body.fecha) : null;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((calificacion: ICalificacion) => {
        calificacion.fecha = calificacion.fecha != null ? moment(calificacion.fecha) : null;
      });
    }
    return res;
  }
}
