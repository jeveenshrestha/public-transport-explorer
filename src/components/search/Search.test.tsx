import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { useFetchStations } from '../../hooks/useFetchStations';
import Search from './Search';

jest.mock('../../hooks/useFetchStations');

describe('Search Component', () => {
  const onSearchMock = jest.fn();
  const onClearMock = jest.fn();
  const fetchStationsMock = jest.fn();

  beforeEach(() => {
    jest.useFakeTimers();
    (useFetchStations as jest.Mock).mockReturnValue({
      fetchStations: fetchStationsMock,
      stationData: [],
    });
  });

  afterEach(() => {
    jest.clearAllTimers();
    jest.clearAllMocks();
  });

  it('calls fetchStations after debounce when input length > 1', async () => {
    render(
      <Search
        onSearch={onSearchMock}
        onSelect={onSearchMock}
        onClear={onClearMock}
      />
    );
    const input = screen.getByPlaceholderText('Search for stations...');
    fireEvent.change(input, { target: { value: 'Pasila' } });

    // Fast-forward time to trigger the debounced function
    jest.advanceTimersByTime(300);
    await waitFor(() =>
      expect(fetchStationsMock).toHaveBeenCalledWith({
        variables: { query: 'Pasila' },
      })
    );
  });

  it('calls onSearch when Entry key is pressed', () => {
    render(
      <Search
        onSearch={onSearchMock}
        onSelect={onSearchMock}
        onClear={onClearMock}
      />
    );
    const input = screen.getByPlaceholderText('Search for stations...');
    fireEvent.change(input, { target: { value: 'Pasila' } });
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });

    expect(onSearchMock).toHaveBeenCalledWith('Pasila');
  });

  it('calls onSearch when search button is clicked', () => {
    render(
      <Search
        onSearch={onSearchMock}
        onSelect={onSearchMock}
        onClear={onClearMock}
      />
    );
    const input = screen.getByPlaceholderText('Search for stations...');
    const button = screen.getByRole('button', { name: 'Search' });
    fireEvent.change(input, { target: { value: 'Pasila' } });
    fireEvent.click(button);

    expect(onSearchMock).toHaveBeenCalledWith('Pasila');
  });

  it('renders suggestions and calls onSelect when a suggestion is clicked', () => {
    //Provide station data for suggestions
    const stationData = [
      {
        gtfsId: 'HSL:1000202',
        name: 'Pasilan asema',
        lat: 60.199228,
        lon: 24.933114,
        vehicleMode: 'RAIL',
      },
      {
        gtfsId: 'HSL:1000004',
        name: 'Pasila',
        lat: 60.198118,
        lon: 24.934074,
        vehicleMode: 'BUS',
      },
    ];
    (useFetchStations as jest.Mock).mockReturnValue({
      fetchStations: fetchStationsMock,
      stationData,
    });

    render(
      <Search
        onSearch={onSearchMock}
        onSelect={onSearchMock}
        onClear={onClearMock}
      />
    );
    const input = screen.getByPlaceholderText('Search for stations...');
    fireEvent.change(input, { target: { value: 'Pasila' } });

    // The suggestion list should appear
    const suggestionItem = screen.getByText('Pasila');
    fireEvent.click(suggestionItem);

    expect(onSearchMock).toHaveBeenCalledWith('Pasila');
  });

  it('calls onClear and resets input when clear button is clicked', () => {
    render(
      <Search
        onSearch={onSearchMock}
        onSelect={onSearchMock}
        onClear={onClearMock}
      />
    );
    const input = screen.getByPlaceholderText('Search for stations...');
    fireEvent.change(input, { target: { value: 'Pasila' } });

    // Ensure clear button is visible when input length > 1
    const clearButton = screen.getByRole('button', { name: /x/i });
    fireEvent.click(clearButton);
    expect(screen.getByPlaceholderText('Search for stations...')).toHaveValue(
      ''
    );
    expect(onClearMock).toHaveBeenCalled();
  });
});
