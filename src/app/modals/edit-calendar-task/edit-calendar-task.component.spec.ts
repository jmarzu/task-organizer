import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCalendarTaskComponent } from './edit-calendar-task.component';

describe('EditCalendarTaskComponent', () => {
  let component: EditCalendarTaskComponent;
  let fixture: ComponentFixture<EditCalendarTaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditCalendarTaskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCalendarTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
