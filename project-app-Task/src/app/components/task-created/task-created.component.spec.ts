import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskCreatedComponent } from './task-created.component';

describe('TaskCreatedComponent', () => {
  let component: TaskCreatedComponent;
  let fixture: ComponentFixture<TaskCreatedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TaskCreatedComponent]
    });
    fixture = TestBed.createComponent(TaskCreatedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
