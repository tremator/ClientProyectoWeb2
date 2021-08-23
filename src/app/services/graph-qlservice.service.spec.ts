import { TestBed } from '@angular/core/testing';

import { GraphQLServiceService } from './graph-qlservice.service';

describe('GraphQLServiceService', () => {
  let service: GraphQLServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GraphQLServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
