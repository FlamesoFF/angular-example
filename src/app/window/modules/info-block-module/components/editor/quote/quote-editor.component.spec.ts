import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuoteEditorComponent } from './quote-editor.component';

describe('EditorComponent', () => {
  let component: QuoteEditorComponent;
  let fixture: ComponentFixture<QuoteEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuoteEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuoteEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
