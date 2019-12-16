import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AncienComponent } from './ancien.component';

describe('AncienComponent', () => {
  let component: AncienComponent;
  let fixture: ComponentFixture<AncienComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AncienComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AncienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
