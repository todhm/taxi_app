// src/app/components/sign-up/sign-up.component.spec.ts
import {
  HttpClientTestingModule, HttpTestingController, TestRequest
} from '@angular/common/http/testing';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';

import { AuthService } from '../../services/auth.service';
import { UserFactory } from '../../testing/factories';
import { SignUpComponent } from './sign-up.component';

describe('SignUpComponent', () => {
  let component: SignUpComponent;
  let fixture: ComponentFixture<SignUpComponent>;
  let router: Router;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([])
      ],
      declarations: [SignUpComponent],
      providers: [AuthService]
    });
    fixture = TestBed.createComponent(SignUpComponent);
    component = fixture.componentInstance;
    router = TestBed.get(Router);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should allow a user to sign up for an account', () => {
    const spy: jasmine.Spy = spyOn(router, 'navigateByUrl');
    const userData = UserFactory.create();
    const photo: File = new File(['photo'], userData.photo, { type: 'image/jpeg' });
    component.user = {
      username: userData.username,
      first_name: userData.first_name,
      last_name: userData.last_name,
      password: 'pAssw0rd!',
      group: userData.group,
      photo: photo
    };
    component.onSubmit();
    const request: TestRequest = httpMock.expectOne('/api/sign_up/');
    request.flush(userData);
    expect(spy).toHaveBeenCalledWith('/log-in');
  });

});
