import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BillInvoicesComponent } from './bill-invoices.component';

describe('BillInvoicesComponent', () => {
  let component: BillInvoicesComponent;
  let fixture: ComponentFixture<BillInvoicesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BillInvoicesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BillInvoicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
