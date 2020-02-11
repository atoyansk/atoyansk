import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmServicesComponent } from './adm-services.component';

describe('AdmServicesComponent', () => {
  let component: AdmServicesComponent;
  let fixture: ComponentFixture<AdmServicesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdmServicesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
