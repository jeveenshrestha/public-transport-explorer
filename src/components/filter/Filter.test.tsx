import { fireEvent, render, screen } from '@testing-library/react';
import Filter from './Filter';
import { Mode } from '../../types/vehicleMode';

describe('Filter Component', () => {
  const onFilterChangeMock = jest.fn();
  // Default modes that the component uses in its initial state.
  const defaultModes: Mode[] = ['BUS', 'TRAM', 'SUBWAY', 'RAIL', 'FERRY'];

  beforeEach(() => {
    onFilterChangeMock.mockClear();
  });

  it('renders icons for all the default modes', () => {
    render(<Filter onFilterChange={onFilterChangeMock} modes={defaultModes} />);
    defaultModes.forEach((mode) => {
      expect(screen.getByAltText(mode)).toBeInTheDocument();
    });
  });

  it('toggles a mode when its icon is clicked', () => {
    render(<Filter onFilterChange={onFilterChangeMock} modes={defaultModes} />);
    const busIcon = screen.getByAltText('BUS');

    // Click to remove the mode (toggle off)
    fireEvent.click(busIcon);
    expect(onFilterChangeMock).toHaveBeenCalledWith(
      expect.not.arrayContaining(['BUS'])
    );

    // Click again to add the mode back (toggle on)
    fireEvent.click(busIcon);
    expect(onFilterChangeMock).toHaveBeenCalledWith(
      expect.arrayContaining(['BUS'])
    );
  });

  it('updates selectedModes when props change', () => {
    const { rerender } = render(
      <Filter onFilterChange={onFilterChangeMock} modes={['BUS']} />
    );
    // Initially, only 'BUS' is selected.
    // Update the props so that only 'TRAM' is selected.
    rerender(<Filter onFilterChange={onFilterChangeMock} modes={['TRAM']} />);

    // Check that the TRAM icon is rendered
    const tramIcon = screen.getByAltText('TRAM');
    expect(tramIcon).toBeInTheDocument();
  });
});
