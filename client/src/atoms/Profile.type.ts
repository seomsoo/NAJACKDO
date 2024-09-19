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
