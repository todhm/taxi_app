import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

class UserData {
  constructor(
    public username?: string,
    public first_name?: string,
    public last_name?: string,
    public password?: string,
    public group?: string,
    public photo?: any
  ) { }
}

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html'
})
export class SignUpComponent {
  user: UserData = new UserData();
  constructor(
    private router: Router,
    private authService: AuthService
  ) { }
  onChange(event): void {
    if (event.target.files && event.target.files.length > 0) {
      this.user.photo = event.target.files[0];
    }
  }
  onSubmit(): void {
    this.authService.signUp(
      this.user.username,
      this.user.first_name,
      this.user.last_name,
      this.user.password,
      this.user.group,
      this.user.photo
    ).subscribe(() => {
      this.router.navigateByUrl('/log-in');
    }, (error) => {
      console.error(error);
    });
  }
}
