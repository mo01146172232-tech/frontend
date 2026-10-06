import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { Observable } from 'rxjs';
import { IContact } from '../models/contact';

@Service()
export class ContactServiice {
    private _http = inject(HttpClient);
    private apiURL = 'http://localhost:3000/contact/text';

    getData(): Observable<IContact[]> {
        return this._http.get<IContact[]>(this.apiURL);
    }

    updateContact(data: Partial<IContact>): Observable<IContact> {
        return this._http.put<IContact>(this.apiURL, data);
    }
}
