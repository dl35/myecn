import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EngagementCreateComponent } from './engagement-create.component';

describe('EngagementCreateComponent', () => {
  let component: EngagementCreateComponent;
  let fixture: ComponentFixture<EngagementCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EngagementCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EngagementCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
