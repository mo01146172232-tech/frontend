import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { SkillsServiice } from '../../core/services/skills-serviice';
import { ISkills } from '../../core/models/skills';
import { HeaderService } from '../../core/services/header-service';

@Component({
  imports: [],
  selector: 'app-skills',
  styleUrl: './skills.css',
  templateUrl: './skills.html',
})
export class Skills implements OnInit {
  title = '';
  skills!:ISkills[];
  private _HeaderService= inject (HeaderService)
  private _SkillsService= inject (SkillsServiice)
  private _cdr= inject (ChangeDetectorRef)

  async ngOnInit() {
    this._HeaderService.getNavbarData().subscribe((data) => {
      this.title = data[0].dataNavbar[2];
      this._cdr.detectChanges();
    });
    this._SkillsService.getData().subscribe((data) => {
      this.skills = data;
      this._cdr.detectChanges(); 
    })
  }
}
