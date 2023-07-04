import { TestBed } from '@angular/core/testing';

import { ViewAndPayBillService } from './view-and-pay-bill.service';

describe('ViewAndPayBillService', () => {
  let service: ViewAndPayBillService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ViewAndPayBillService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
