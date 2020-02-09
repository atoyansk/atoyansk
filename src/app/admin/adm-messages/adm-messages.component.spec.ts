import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmMessagesComponent } from './adm-messages.component';

describe('AdmMessagesComponent', () => {
  let component: AdmMessagesComponent;
  let fixture: ComponentFixture<AdmMessagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdmMessagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmMessagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
