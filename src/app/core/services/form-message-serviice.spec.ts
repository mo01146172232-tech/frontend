import { TestBed } from '@angular/core/testing';
import { FormMessageServiice } from './form-message-serviice';

describe('FormMessageServiice', () => {
  let service: FormMessageServiice;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormMessageServiice);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
