import { TestBed } from '@angular/core/testing';
import { ServicesServiice } from './services-serviice';

describe('ServicesServiice', () => {
  let service: ServicesServiice;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicesServiice);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
