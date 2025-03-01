import { Station, Stop } from "./station";
import { Mode } from "./vehicleMode";

export interface GetStationsResponse {
  stations: Station[];
}

export interface GetStopsResponse {
  station: {
    name: string;
    stops: Stop[];
    vehicleMode: Mode;
  }
}