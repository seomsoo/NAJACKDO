export interface IProfile {
  nickname: string;
  profileImage: string;
  locationName: string;
  mannerScore: number;
  goodReviewCount: number;
  badReviewCount: number;
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
