import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AuthService } from './services/auth.service';
import { TripListResolver } from './services/trip-list.resolver';
import { TripDetailResolver } from './services/trip-detail.resolver';

import { IsRider } from './services/is-rider.service';
import { IsDriver } from './services/is-driver.service';

import { AppComponent } from './app.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { LogInComponent } from './components/log-in/log-in.component';
import { LandingComponent } from './components/landing/landing.component';
import { RiderComponent } from './components/rider/rider.component';
import { RiderDashboardComponent } from './components/rider-dashboard/rider-dashboard.component';
import { RiderRequestComponent } from './components/rider-request/rider-request.component';
import { RiderDetailComponent } from './components/rider-detail/rider-detail.component';
import { TripCardComponent } from './components/trip-card/trip-card.component';
import { DriverComponent } from './components/driver/driver.component';
import { DriverDashboardComponent } from './components/driver-dashboard/driver-dashboard.component';
import { DriverDetailComponent } from './components/driver-detail/driver-detail.component';
import { AgmCoreModule } from '@agm/core';
import { environment } from '../environments/environment';
import { GoogleMapsService } from './services/google-maps.service';

@NgModule({
  declarations: [
    AppComponent,
    SignUpComponent,
    LogInComponent,
    LandingComponent,
    RiderComponent,
    RiderDashboardComponent,
    RiderRequestComponent,
    RiderDetailComponent,
    TripCardComponent,
    DriverComponent,
    DriverDashboardComponent,
    DriverDetailComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    FormsModule,
    RouterModule.forRoot([
      { path: 'log-in', component: LogInComponent },
      { path: 'sign-up', component: SignUpComponent },
      {
        path: 'rider',
        component: RiderComponent,
        canActivate: [IsRider],
        children: [
          {
            path: 'request',
            component: RiderRequestComponent
          },
          {
            path: ':nk',
            component: RiderDetailComponent,
            resolve: { trip: TripDetailResolver }
          },
          {
            path: '',
            component: RiderDashboardComponent,
            resolve: { trips: TripListResolver }
          }
        ]
      },
      {
        path: 'driver',
        component: DriverComponent,
        canActivate: [IsDriver],
        children: [
          {
            path: '',
            component: DriverDashboardComponent,
            resolve: { trips: TripListResolver }
          },
          {
            path: ':nk',
            component: DriverDetailComponent,
            resolve: { trip: TripDetailResolver }
          }
        ]
      }, // new
      { path: '', component: LandingComponent }
    ]),
    AgmCoreModule.forRoot({
      apiKey: environment.GOOGLE_API_KEY
    })
  ],
  providers: [AuthService, IsRider, TripListResolver, TripDetailResolver, IsDriver, GoogleMapsService],
  bootstrap: [AppComponent]
})

export class AppModule { }
