export interface UserImgRes {
  userImages: UserImage[];
}

export interface UserImage {
  ImageID: number;
  UserID: number;
  ImageURL: string;
  EloScore: number;
  UploadDate: Date;
}
