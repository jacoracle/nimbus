import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IEjercicio } from 'app/shared/model/ejercicio.model';

type EntityResponseType = HttpResponse<IEjercicio>;
type EntityArrayResponseType = HttpResponse<IEjercicio[]>;

@Injectable({ providedIn: 'root' })
export class EjercicioService {
  public resourceUrl = SERVER_API_URL + 'api/ejercicios';

  constructor(protected http: HttpClient) {}

  create(ejercicio: IEjercicio): Observable<EntityResponseType> {
    return this.http.post<IEjercicio>(this.resourceUrl, ejercicio, { observe: 'response' });
  }

  update(ejercicio: IEjercicio): Observable<EntityResponseType> {
    return this.http.put<IEjercicio>(this.resourceUrl, ejercicio, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IEjercicio>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IEjercicio[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
