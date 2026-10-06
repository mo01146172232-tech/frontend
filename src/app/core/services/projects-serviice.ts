import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { IProject } from '../models/projects';
import { Observable } from 'rxjs/internal/Observable';

@Service()
export class ProjectsServiice {
    private _http: HttpClient=inject(HttpClient);
    private apiURL: string = 'http://localhost:3000/projects';
    getData():Observable<IProject[]> {
        return this._http.get<IProject[]>(this.apiURL);
    }
    postProduct(projectData:FormData){
        return this._http.post(this.apiURL,projectData)
    }
}
