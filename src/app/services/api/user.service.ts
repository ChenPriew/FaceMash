import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Constants } from '../../config/constants';
import { lastValueFrom, throwError } from 'rxjs';
import { LoginRes } from '../../model/login_res';
import { RandomImgRes } from '../../model/ran_img_res';
import { TopReted } from '../../model/top_reted_res';
import { UserRes } from '../../model/user_res';
import { UserImgRes } from '../../model/user_img_res';
import { VoteRes } from '../../model/vote_res';
import { ImgStatRes } from '../../model/img_stat_res';
import { CoolDownRes } from '../../model/cooldown_res';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private constants: Constants, private http: HttpClient) {}

  public async postLogin(options?: any) {
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
    const url = this.constants.API_ENDPOINT + '/register';

    try {
      const response = await lastValueFrom(this.http.post(url, options));
      return response as LoginRes;
    } catch (error) {
      console.error('An error occurred:', error);
      throw error;
    }
  }

  public async getRanImg(option?: any) {
    const url = this.constants.API_ENDPOINT + '/randomImages';
    const response = await lastValueFrom(this.http.get(url));
    return response as RandomImgRes[];
  }

  public async vote(options?: any) {
    const url = this.constants.API_ENDPOINT + '/vote';

    try {
      const response = await lastValueFrom(this.http.post(url, options));
      return response as VoteRes;
    } catch (error) {
      console.error('An error occurred:', error);
      console.log('Full error response:', error);
      return throwError('Something went wrong. Please try again later.');
    }
  }

  public async getTopRated(option?: any) {
    const url = this.constants.API_ENDPOINT + '/top-rated';
    const response = await lastValueFrom(this.http.get(url));
    return response as TopReted[];
  }

  public async getUser(id: any) {
    const url = this.constants.API_ENDPOINT + '/users/' + id;
    const response = await lastValueFrom(this.http.get(url));
    return response as UserRes;
  }

  public async getImgUser(id: any) {
    const url = this.constants.API_ENDPOINT + '/view-image/' + id;
    const response = await lastValueFrom(this.http.get(url));
    return response as UserImgRes;
  }

  public async putUser(id: any, options?: any) {
    const url = this.constants.API_ENDPOINT + '/updateUserInfo/' + id;

    try {
      const response = await lastValueFrom(this.http.put(url, options));
      return response as VoteRes;
    } catch (error) {
      console.error('An error occurred:', error);
      throw error;
    }
  }

  public async putPassword(id: any, options?: any) {
    const url = this.constants.API_ENDPOINT + '/updatePassword/' + id;

    try {
      const response = await lastValueFrom(this.http.put(url, options));
      return response as VoteRes;
    } catch (error) {
      console.error('An error occurred:', error);
      throw error;
    }
  }

  public uploadAvatar(file: File, userId: any) {
    const formData = new FormData();
    const url = this.constants.API_ENDPOINT + '/uploadAvatar';
    formData.append('123', file); // Use the correct field name here
    formData.append('userId', userId); // Append the user ID to the form data

    return this.http.post(url, formData);
  }

  public uploadImg(file: File, userId: any) {
    const formData = new FormData();
    const url = this.constants.API_ENDPOINT + '/upload';
    formData.append('123', file); // Use the correct field name here
    formData.append('id', userId); // Append the user ID to the form data

    return this.http.post(url, formData);
  }

  public upDateImg(file: File, imgId: any, userId: any) {
    const formData = new FormData();
    const url = this.constants.API_ENDPOINT + '/updateImage';
    formData.append('123', file); // Use the correct field name here
    formData.append('imageId', imgId);
    formData.append('id', userId); // Append the user ID to the form data

    return this.http.post(url, formData);
  }

  public async deleteImg(id: any) {
    const url = this.constants.API_ENDPOINT + '/deleteImage/' + id;
    const response = await lastValueFrom(this.http.delete(url));
    return response as VoteRes;
  }

  public async getImgStat(id: any) {
    const url = this.constants.API_ENDPOINT + '/image-stats/' + id;
    const response = await lastValueFrom(this.http.get(url));
    return response as ImgStatRes[];
  }

  public async getUsers() {
    const url = this.constants.API_ENDPOINT + '/users';
    const response = await lastValueFrom(this.http.get(url));
    return response as UserRes[];
  }

  public async getCoolDown() {
    const url = this.constants.API_ENDPOINT + '/cooldown';
    const response = await lastValueFrom(this.http.get(url));
    return response as CoolDownRes[];
  }

  public async setCoolDown(option?: any) {
    const url = this.constants.API_ENDPOINT + '/cooldown';

    try {
      const response = await lastValueFrom(this.http.put(url, option));
      return response as VoteRes;
    } catch (error) {
      console.error('An error occurred:', error);
      throw error;
    }
  }
}
