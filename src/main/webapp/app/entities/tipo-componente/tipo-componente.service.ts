import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ITipoComponente } from 'app/shared/model/tipo-componente.model';

type EntityResponseType = HttpResponse<ITipoComponente>;
type EntityArrayResponseType = HttpResponse<ITipoComponente[]>;

@Injectable({ providedIn: 'root' })
export class TipoComponenteService {
  public resourceUrl = SERVER_API_URL + 'api/tipo-componentes';

  constructor(protected http: HttpClient) {}

  create(tipoComponente: ITipoComponente): Observable<EntityResponseType> {
    return this.http.post<ITipoComponente>(this.resourceUrl, tipoComponente, { observe: 'response' });
  }

  update(tipoComponente: ITipoComponente): Observable<EntityResponseType> {
    return this.http.put<ITipoComponente>(this.resourceUrl, tipoComponente, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ITipoComponente>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ITipoComponente[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
