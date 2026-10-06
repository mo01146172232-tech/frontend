import { inject, Service } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IService } from '../models/service';

@Service()
export class ServicesServiice {
    private _http = inject(HttpClient);
    private apiURL = 'http://localhost:3000/services';

    getData(): Observable<IService[]> {
        return this._http.get<IService[]>(this.apiURL);
    }

    createService(data: Partial<IService>): Observable<IService> {
        return this._http.post<IService>(this.apiURL, data);
    }

    updateService(id: string, data: Partial<IService>): Observable<IService> {
        return this._http.put<IService>(`${this.apiURL}/${id}`, data);
    }

    deleteService(id: string): Observable<IService[]> {
        return this._http.delete<IService[]>(`${this.apiURL}/${id}`);
    }
}
