import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmSkillsComponent } from './adm-skills.component';

describe('AdmSkillsComponent', () => {
  let component: AdmSkillsComponent;
  let fixture: ComponentFixture<AdmSkillsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdmSkillsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmSkillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
