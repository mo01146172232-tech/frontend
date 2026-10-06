import { TestBed } from '@angular/core/testing';
import { SkillsServiice } from './skills-serviice';

describe('SkillsServiice', () => {
  let service: SkillsServiice;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SkillsServiice);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
