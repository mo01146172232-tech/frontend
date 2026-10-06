import { inject, Service } from '@angular/core';
import { IFormMessage } from '../models/formMessage';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

@Service()
export class FormMessageServiice {
    private _http: HttpClient=inject(HttpClient);
    private apiURL: string = 'http://localhost:3000/contact/message';
    postMessage(message: IFormMessage): Observable<IFormMessage> {
        return this._http.post<IFormMessage>(this.apiURL, message);
    }
    getData(){
        return this._http.get<IFormMessage[]>(this.apiURL);
    }
}
