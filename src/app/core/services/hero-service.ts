import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { IHero } from '../models/hero';
import { Observable } from 'rxjs';

@Service()
export class HeroService {
    private _http: HttpClient=inject(HttpClient);
    private apiURL: string = 'http://localhost:3000/hero';
    getData():Observable<IHero[]> {
        return this._http.get<IHero[]>(this.apiURL);
    }
    updateHero(formData: FormData): Observable<IHero> {
    return this._http.put<IHero>(this.apiURL, formData);
  }
  deleteHero(): Observable<IHero> {
    return this._http.delete<IHero>(this.apiURL);
  }
}
