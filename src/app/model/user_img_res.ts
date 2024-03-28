export interface UserImgRes {
  userImages: UserImage[];
}

export interface UserImage {
  ImageID: number;
  ImageURL: string;
  EloScore: number;
  Date: Date;
  currentRank: number;
  previousRank: number;
  rankChange: any;
}
