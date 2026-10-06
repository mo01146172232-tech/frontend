import { TestBed } from '@angular/core/testing';
import { ContactServiice } from './contact-serviice';

describe('ContactServiice', () => {
  let service: ContactServiice;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContactServiice);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
