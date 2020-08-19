import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogControlsComponent } from './dialog-controls.component';

describe('DialogCommonControlsComponent', () => {
  let component: DialogControlsComponent;
  let fixture: ComponentFixture<DialogControlsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogControlsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogControlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
