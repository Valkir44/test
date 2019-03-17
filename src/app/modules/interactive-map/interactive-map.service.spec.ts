import { TestBed } from '@angular/core/testing';

import { InteractiveMapService } from './interactive-map.service';

describe('InteractiveMapService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InteractiveMapService = TestBed.get(InteractiveMapService);
    expect(service).toBeTruthy();
  });
});
