import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { IHeader } from '../models/header';
import { Observable } from 'rxjs';

@Service()
export class HeaderService {
    private _http=inject(HttpClient);
    private _apiURL = 'http://localhost:3000/nav';
    getNavbarData():Observable<IHeader[]> {
        return this._http.get<IHeader[]>(this._apiURL);
    }
    updateHeader(data: Partial<IHeader>): Observable<IHeader> {
        return this._http.put<IHeader>(this._apiURL, data);
      }
}
