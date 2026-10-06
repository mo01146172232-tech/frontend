import { TestBed } from '@angular/core/testing';
import { ProjectsServiice } from './projects-serviice';

describe('ProjectsServiice', () => {
  let service: ProjectsServiice;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProjectsServiice);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
