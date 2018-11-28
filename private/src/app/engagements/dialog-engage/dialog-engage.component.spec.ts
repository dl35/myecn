import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEngageComponent } from './dialog-engage.component';

describe('DialogEngageComponent', () => {
  let component: DialogEngageComponent;
  let fixture: ComponentFixture<DialogEngageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogEngageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogEngageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
