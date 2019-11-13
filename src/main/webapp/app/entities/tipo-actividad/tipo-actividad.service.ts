import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ITipoActividad } from 'app/shared/model/tipo-actividad.model';

type EntityResponseType = HttpResponse<ITipoActividad>;
type EntityArrayResponseType = HttpResponse<ITipoActividad[]>;

@Injectable({ providedIn: 'root' })
export class TipoActividadService {
  public resourceUrl = SERVER_API_URL + 'api/tipo-actividads';

  constructor(protected http: HttpClient) {}

  create(tipoActividad: ITipoActividad): Observable<EntityResponseType> {
    return this.http.post<ITipoActividad>(this.resourceUrl, tipoActividad, { observe: 'response' });
  }

  update(tipoActividad: ITipoActividad): Observable<EntityResponseType> {
    return this.http.put<ITipoActividad>(this.resourceUrl, tipoActividad, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ITipoActividad>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ITipoActividad[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
