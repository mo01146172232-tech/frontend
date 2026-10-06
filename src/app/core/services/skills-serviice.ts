import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { Observable } from 'rxjs';
import { ISkills } from '../models/skills';

@Service()
export class SkillsServiice {
    private _http = inject(HttpClient);
    private apiURL = 'http://localhost:3000/skills';

    getData(): Observable<ISkills[]> {
        return this._http.get<ISkills[]>(this.apiURL);
    }

    createSkill(data: Partial<ISkills>): Observable<ISkills> {
        return this._http.post<ISkills>(this.apiURL, data);
    }

    updateSkill(id: string, data: Partial<ISkills>): Observable<ISkills> {
        return this._http.put<ISkills>(`${this.apiURL}/${id}`, data);
    }

    deleteSkill(id: string): Observable<ISkills[]> {
        return this._http.delete<ISkills[]>(`${this.apiURL}/${id}`);
    }
}
