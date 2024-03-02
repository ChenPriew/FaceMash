import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Constants } from '../../config/constants';
import { lastValueFrom, throwError } from 'rxjs';
import { LoginRes } from '../../model/login_res';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private constants: Constants, private http: HttpClient) {}

  public async postLogin(options?: any) {
    console.log(options);

    const url = this.constants.API_ENDPOINT + '/login';

    try {
      const response = await lastValueFrom(this.http.post(url, options));
      return response as LoginRes;
    } catch (error) {
      console.error('An error occurred:', error);
      return throwError('Something went wrong. Please try again later.');
    }
  }

  public async postRegister(options?: any) {
    console.log(options);

    const url = this.constants.API_ENDPOINT + '/register';

    try {
      const response = await lastValueFrom(this.http.post(url, options));
      return response as LoginRes;
    } catch (error) {
      console.error('An error occurred:', error);
      return throwError('Something went wrong. Please try again later.');
    }
  }
}
