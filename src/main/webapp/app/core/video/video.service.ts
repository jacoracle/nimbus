import { Injectable } from '@angular/core';
import { SERVER_API_URL } from 'app/app.constants';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { IVideo } from './video.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class VideoService {
  public resourceUrl = SERVER_API_URL + '/api/uploadFile';

  constructor(private http: HttpClient) {}

  pushFileToStorage(file: File): Observable<IVideo> {
    const data: FormData = new FormData();
    data.append('file', file);
    return this.http.post<IVideo>(this.resourceUrl, data);
  }
}
