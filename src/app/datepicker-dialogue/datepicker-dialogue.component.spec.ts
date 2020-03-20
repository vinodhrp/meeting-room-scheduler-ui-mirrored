import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatepickerDialogueComponent } from './datepicker-dialogue.component';

describe('DatepickerDialogueComponent', () => {
  let component: DatepickerDialogueComponent;
  let fixture: ComponentFixture<DatepickerDialogueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatepickerDialogueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatepickerDialogueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
