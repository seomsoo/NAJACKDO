export interface IProfile {
  userId: number;
  nickname: string;
  profileImage: string;
  locationName: string;
  mannerScore: number;
  goodReviewInfo: IUserReview[];
  badReviewInfo: IUserReview[];
  cash?: number;
  saveCash?: number;
  earnCash?: number;
}

export interface ILeafLog {
  cash: number;
  resultCash: number;
  type: string;
  createdAt: string;
}

export interface INickname {
  nickname: string;
}

export interface IUserInfo {
  nickname: string;
  gender: string;
  age: string;
  interest: number[];
}

export interface IUserReview {
  reviewId: number;
  content: string;
  count: number;
}
