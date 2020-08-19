import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListElementControlsComponent } from './list-element-controls.component';

describe('DialogListElementControlsComponent', () => {
  let component: ListElementControlsComponent;
  let fixture: ComponentFixture<ListElementControlsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListElementControlsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListElementControlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
