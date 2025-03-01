import busIcon from '../assets/icons/bus-icon.svg';
import tramIcon from '../assets/icons/tram-icon.svg';
import metroIcon from '../assets/icons/metro-icon.svg';
import trainIcon from '../assets/icons/train-icon.svg';
import ferryIcon from '../assets/icons/ferry-icon.svg';
import busGrey from '../assets/icons/bus-grey.svg';
import tramGrey from '../assets/icons/tram-grey.svg';
import metroGrey from '../assets/icons/metro-grey.svg';
import trainGrey from '../assets/icons/train-grey.svg';
import ferryGrey from '../assets/icons/ferry-grey.svg';
import { Mode } from '../types/vehicleMode';

export const modeIcons = {
  BUS: { active: busIcon, inactive: busGrey },
  TRAM: { active: tramIcon, inactive: tramGrey },
  SUBWAY: { active: metroIcon, inactive: metroGrey },
  RAIL: { active: trainIcon, inactive: trainGrey },
  FERRY: { active: ferryIcon, inactive: ferryGrey },
} as const;

export const colors: Record<Mode, string> = {
  BUS: "#007AC9",
  TRAM: "#008151",
  SUBWAY: "#CA4000",
  RAIL: "#8C4799",
  FERRY: "#007A97"
}