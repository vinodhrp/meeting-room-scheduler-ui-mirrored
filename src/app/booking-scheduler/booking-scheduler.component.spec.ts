import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingSchedulerComponent } from './booking-scheduler.component';

describe('BookingSchedulerComponent', () => {
  let component: BookingSchedulerComponent;
  let fixture: ComponentFixture<BookingSchedulerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookingSchedulerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookingSchedulerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
