import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ISeccion } from 'app/shared/model/seccion.model';

type EntityResponseType = HttpResponse<ISeccion>;
type EntityArrayResponseType = HttpResponse<ISeccion[]>;

@Injectable({ providedIn: 'root' })
export class SeccionService {
  public resourceUrl = SERVER_API_URL + 'api/seccions';

  constructor(protected http: HttpClient) {}

  create(seccion: ISeccion): Observable<EntityResponseType> {
    return this.http.post<ISeccion>(this.resourceUrl, seccion, { observe: 'response' });
  }

  update(seccion: ISeccion): Observable<EntityResponseType> {
    return this.http.put<ISeccion>(this.resourceUrl, seccion, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ISeccion>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ISeccion[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
