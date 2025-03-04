const React = require('react');

const useMap = jest.fn(() => ({
  setView: jest.fn(), // Mock setView to prevent crashes
}));

const children = React.createElement('div', {}, 'Pasila');

module.exports = {
  MapContainer: jest.fn(({ children }) => React.createElement('div', {}, children)),
  TileLayer: jest.fn(() => React.createElement('div', {}, 'TileLayer')),
  Marker: jest.fn(() => React.createElement('div', {}, 'Pasila')),
  Popup: jest.fn(({ children }) => React.createElement('div', {}, children)),
  useMap, // Mocked useMap
};
