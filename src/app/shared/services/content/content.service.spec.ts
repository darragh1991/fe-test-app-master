import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { ContentService } from './content.service';

describe('ContentService', () => {
  beforeEach(
    () => TestBed.configureTestingModule({
      imports: [HttpClientModule]
    }));

  it('should be created', () => {
    const service: ContentService = TestBed.get(ContentService);
    expect(service).toBeTruthy();
  });
});
