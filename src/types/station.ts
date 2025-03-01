import { Mode } from './vehicleMode';

export interface NearestStation {
  node: {
    place: {
      gtfsId: string;
      name: string;
      lat: number;
      lon: number;
      vehicleMode: Mode;
    };
  };
}

export interface Station {
  gtfsId: string;
  name: string;
  lat: number;
  lon: number;
  vehicleMode: Mode;
  stops: Array<Stop>;
}

export interface Stop {
  gtfsId: string;
  name: string;
  vehicleMode: string;
  stoptimesWithoutPatterns: StopTimesWithoutPatterns[];
}

export interface StopTimesWithoutPatterns {
  stop: {
    platformCode: string;
  };
  serviceDay: number;
  scheduledArrival: number;
  scheduledDeparture: number;
  trip: {
    route: {
      gtfsId: string;
      shortName: string;
      longName: string;
      mode: Mode;
    };
  };
  headsign: string;
}
