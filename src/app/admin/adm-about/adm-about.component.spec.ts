import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmAboutComponent } from './adm-about.component';

describe('AdmAboutComponent', () => {
  let component: AdmAboutComponent;
  let fixture: ComponentFixture<AdmAboutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdmAboutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmAboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
