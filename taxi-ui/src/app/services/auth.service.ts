import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
import { CookieStorage } from 'cookie-storage';

export class User {
  constructor(
    public id?: number,
    public username?: string,
    public first_name?: string,
    public last_name?: string,
    public group?: string,
    public photo?: any
  ) { }
  static create(data: any): User {
    return new User(
      data.id,
      data.username,
      data.first_name,
      data.last_name,
      data.group,
      `/media/${data.photo}`
    );
  }
  static getUser(): User {
    const userData = localStorage.getItem('taxi.user');
    if (userData) {
      return User.create(JSON.parse(userData));
    }
    return null;
  }
  static isRider(): boolean {
    const user = User.getUser();
    if (user === null) {
      return false;
    }
    return user.group === 'rider';
  }
  static isDriver(): boolean {
    const user = User.getUser();
    if (user === null) {
      return false;
    }
    return user.group === 'driver';
  }
}


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  signUp(
    username: string,
    first_name: string,
    last_name: string,
    password: string,
    group: string,
    photo: any,
  ): Observable<User> {
    const url = '/api/sign_up/'
    const formData = new FormData();
    formData.append('username', username);
    formData.append('first_name', first_name);
    formData.append('last_name', last_name);
    formData.append('password1', password);
    formData.append('password2', password);
    formData.append('group', group);
    formData.append('photo', photo);
    return this.http.request<User>('POST', url, { body: formData });
  }

  logIn(username: string, password: string): Observable<User> {
    const url = '/api/log_in/';
    return this.http.post<User>(url, { username, password }).pipe(
      tap(user => localStorage.setItem('taxi.user', JSON.stringify(user)))
    );
  }

  logOut(): Observable<any> {
    const url = '/api/log_out/';
    const cookieStorage = new CookieStorage();
    cookieStorage.clear();
    return this.http.post(url, null).pipe(
      finalize(() => {
        localStorage.removeItem('taxi.user');
        const cookieStorage = new CookieStorage();
        cookieStorage.clear();
      }
      )
    );
  }


}
