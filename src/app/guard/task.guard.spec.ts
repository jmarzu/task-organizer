import { TestBed, async, inject } from '@angular/core/testing';

import { TaskGuard } from './task.guard';

describe('TaskGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TaskGuard]
    });
  });

  it('should ...', inject([TaskGuard], (guard: TaskGuard) => {
    expect(guard).toBeTruthy();
  }));
});
