import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttachmentComponentComponent } from './attachment-component.component';

describe('FileComponentComponent', () => {
  let component: AttachmentComponentComponent;
  let fixture: ComponentFixture<AttachmentComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttachmentComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttachmentComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
