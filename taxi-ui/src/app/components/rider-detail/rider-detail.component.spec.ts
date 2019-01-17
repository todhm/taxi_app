import {
  HttpClientTestingModule, HttpTestingController, TestRequest
} from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RiderDetailComponent } from './rider-detail.component';

describe('RiderDetailComponent', () => {
  let component: RiderDetailComponent;
  let fixture: ComponentFixture<RiderDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RiderDetailComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RiderDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
