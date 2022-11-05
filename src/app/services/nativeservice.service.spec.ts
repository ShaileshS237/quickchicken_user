import { TestBed } from '@angular/core/testing';

import { NativeserviceService } from './nativeservice.service';

describe('NativeserviceService', () => {
  let service: NativeserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NativeserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
