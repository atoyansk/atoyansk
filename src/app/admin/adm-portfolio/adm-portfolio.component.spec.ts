import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmPortfolioComponent } from './adm-portfolio.component';

describe('AdmPortfolioComponent', () => {
  let component: AdmPortfolioComponent;
  let fixture: ComponentFixture<AdmPortfolioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdmPortfolioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmPortfolioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
