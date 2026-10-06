import { inject, Service } from '@angular/core';
import { IAbout } from '../models/about';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient } from '@angular/common/http';

@Service()
export class AboutServiice {
    private _http: HttpClient=inject(HttpClient);
    private apiURL: string = 'http://localhost:3000/about';
    getData():Observable<IAbout[]> {
        return this._http.get<IAbout[]>(this.apiURL);
    }
    putAbout(data:{text:string}):Observable<IAbout> {
        return this._http.put<IAbout>(this.apiURL,data);
    }
    deleteAbout(): Observable<IAbout> {
        return this._http.delete<IAbout>(this.apiURL);
    }
}
