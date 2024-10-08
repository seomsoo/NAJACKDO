export interface INearLocation {
  locationCode: number;
  locationName: string;
  latitude: number;
  longitude: number;
}

export interface ILocationRange {
  locationCode: number;
  locationName: string;
  locationPoint: any;
  polygon: any;
}

export interface IMyLocation {
  locationCode: number;
  distanceMeters: number;
}
