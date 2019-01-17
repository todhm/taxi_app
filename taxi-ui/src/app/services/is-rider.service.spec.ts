import { TestBed } from '@angular/core/testing';
import { IsRider } from './is-rider.service';
import { UserFactory } from '../testing/factories';

describe('IsRiderService', () => {
  it('should allow a rider to access a route', () => {
    const isRider: IsRider = new IsRider();
    localStorage.setItem('taxi.user', JSON.stringify(
      UserFactory.create({ group: 'rider' })
    ));
    expect(isRider.canActivate()).toBeTruthy();
  });
  it('should not allow a non-rider to access a route', () => {
    const isRider: IsRider = new IsRider();
    localStorage.setItem('taxi.user', JSON.stringify(
      UserFactory.create({ group: 'driver' })
    ));
    expect(isRider.canActivate()).toBeFalsy();
  });
});
