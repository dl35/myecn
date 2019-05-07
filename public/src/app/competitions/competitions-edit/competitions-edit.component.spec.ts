import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompetitionsEditComponent } from './competitions-edit.component';

describe('CompetitionsEditComponent', () => {
  let component: CompetitionsEditComponent;
  let fixture: ComponentFixture<CompetitionsEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompetitionsEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompetitionsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
