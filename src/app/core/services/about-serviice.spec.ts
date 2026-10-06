import { TestBed } from '@angular/core/testing';
import { AboutServiice } from './about-serviice';

describe('AboutServiice', () => {
  let service: AboutServiice;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AboutServiice);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
