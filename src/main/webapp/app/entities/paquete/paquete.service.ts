import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IPaquete } from 'app/shared/model/paquete.model';

type EntityResponseType = HttpResponse<IPaquete>;
type EntityArrayResponseType = HttpResponse<IPaquete[]>;

@Injectable({ providedIn: 'root' })
export class PaqueteService {
  public resourceUrl = SERVER_API_URL + 'api/paquetes';

  constructor(protected http: HttpClient) {}

  create(paquete: IPaquete): Observable<EntityResponseType> {
    return this.http.post<IPaquete>(this.resourceUrl, paquete, { observe: 'response' });
  }

  update(paquete: IPaquete): Observable<EntityResponseType> {
    return this.http.put<IPaquete>(this.resourceUrl, paquete, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IPaquete>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IPaquete[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
