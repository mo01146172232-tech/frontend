import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { IProject } from '../../core/models/projects';
import { ProjectsServiice } from '../../core/services/projects-serviice';
import { HeaderService } from '../../core/services/header-service';

@Component({
  imports: [],
  selector: 'app-projects',
  styleUrl: './projects.css',
  templateUrl: './projects.html',
})
export class Projects implements OnInit {
  projects: IProject[] = [];
  currentPage = 0;
  projectsPerPage = 3;
  title = '';
  private _HeaderService= inject (HeaderService)
  private _ProjectService= inject (ProjectsServiice)
  private _cdr= inject (ChangeDetectorRef)

    async ngOnInit() {
        this._HeaderService.getNavbarData().subscribe((data) => {
        this.title = data[0].dataNavbar[3];
        this._cdr.detectChanges();
      });
      this._ProjectService.getData().subscribe((data) => {
        this.projects = data ?? [];
        this.currentPage = 0;
        this._cdr.detectChanges();
      });
    }
  staticURL = 'http://localhost:3000/projects/imgs/';

  get visibleProjects(): IProject[] {
    const start = this.currentPage * this.projectsPerPage;
    return this.projects.slice(start, start + this.projectsPerPage);
  }

  get pageCount(): number {
    return Math.ceil(this.projects.length / this.projectsPerPage);
  }

  get pages(): number[] {
    return Array.from({ length: this.pageCount }, (_, index) => index);
  }

  previousPage(): void {
    if (this.currentPage > 0) {
      this.currentPage--;
    }
  }

  nextPage(): void {
    if (this.currentPage < this.pageCount - 1) {
      this.currentPage++;
    }
  }

  goToPage(page: number): void {
    if (page >= 0 && page < this.pageCount) {
      this.currentPage = page;
    }
  }
}
