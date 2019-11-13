import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IComponente } from 'app/shared/model/componente.model';

type EntityResponseType = HttpResponse<IComponente>;
type EntityArrayResponseType = HttpResponse<IComponente[]>;

@Injectable({ providedIn: 'root' })
export class ComponenteService {
  public resourceUrl = SERVER_API_URL + 'api/componentes';

  constructor(protected http: HttpClient) {}

  create(componente: IComponente): Observable<EntityResponseType> {
    return this.http.post<IComponente>(this.resourceUrl, componente, { observe: 'response' });
  }

  update(componente: IComponente): Observable<EntityResponseType> {
    return this.http.put<IComponente>(this.resourceUrl, componente, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IComponente>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IComponente[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
