import L from 'leaflet';
import busIcon from '../assets/icons/bus-icon.svg';
import tramIcon from '../assets/icons/tram-icon.svg';
import metroIcon from '../assets/icons/metro-icon.svg';
import trainIcon from '../assets/icons/train-icon.svg';
import ferryIcon from '../assets/icons/ferry-icon.svg';
import { Station } from './station';

export interface MapProps {
  stations: Station[];
  onStationClick: (id: string) => void;
}

export interface MarkerProps {
  position: [number, number];
  icon: L.Icon;
}

// Define custom icons for each mode

export const modeIcons: Record<string, L.Icon> = {
  BUS: L.icon({ iconUrl: busIcon, iconSize: [32, 32] }),
  TRAM: L.icon({ iconUrl: tramIcon, iconSize: [32, 32] }),
  SUBWAY: L.icon({ iconUrl: metroIcon, iconSize: [32, 32] }),
  RAIL: L.icon({ iconUrl: trainIcon, iconSize: [32, 32] }),
  FERRY: L.icon({ iconUrl: ferryIcon, iconSize: [32, 32] }),
};
