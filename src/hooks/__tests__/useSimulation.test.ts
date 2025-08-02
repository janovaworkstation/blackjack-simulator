import { renderHook, act } from '@testing-library/react';
import { useSimulation } from '../useSimulation';
import { SimulationConfig } from '../../types/blackjack';
import { BlackjackSimulation } from '../../utils/BlackjackEngine';

// Mock the BlackjackSimulation
jest.mock('../../utils/BlackjackEngine');

const MockedBlackjackSimulation = BlackjackSimulation as jest.MockedClass<
  typeof BlackjackSimulation
>;

const mockConfig: SimulationConfig = {
  numberOfDecks: 6,
  deckPenetration: 75,
  playerBet: 25,
  dealerHitsOnSoft17: true,
  playerCanDouble: true,
  playerCanSplit: true,
  playerCanSurrender: false,
  numberOfSimulations: 100,
  enableHandTracking: false,
};

const mockResults = {
  handsPlayed: 100,
  totalOutcomes: 100,
  wins: 45,
  losses: 50,
  pushes: 5,
  blackjacks: 8,
  playerBusts: 15,
  dealerBusts: 12,
  surrenders: 0,
  winPercentage: 45,
  lossPercentage: 50,
  pushPercentage: 5,
  totalWagered: 2500,
  totalWon: 2250,
  netResult: -250,
  expectedValue: -2.5,
  averageBetSize: 25,
  maxDrawdown: 500,
  handsPerHour: 100,
  countingSystem: 'Hi-Lo',
  sessionResults: [],
  handDetails: [],
  busts: 15,
  doubles: 20,
  splits: 8,
  hands15: 12,
  hands16: 18,
};

describe('useSimulation', () => {
  let mockSimulationInstance: jest.Mocked<BlackjackSimulation>;

  beforeEach(() => {
    jest.clearAllMocks();
    jest.clearAllTimers();
    jest.useFakeTimers();

    mockSimulationInstance = {
      simulate: jest.fn(),
    } as jest.Mocked<BlackjackSimulation>;

    MockedBlackjackSimulation.mockImplementation(() => mockSimulationInstance);
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('initializes with correct default state', () => {
    const { result } = renderHook(() => useSimulation());

    expect(result.current.isRunning).toBe(false);
    expect(result.current.results).toBeNull();
    expect(result.current.progress).toBeNull();
  });

  it('provides runSimulation function', () => {
    const { result } = renderHook(() => useSimulation());

    expect(typeof result.current.runSimulation).toBe('function');
  });

  it('sets running state when simulation starts', async () => {
    const { result } = renderHook(() => useSimulation());

    mockSimulationInstance.simulate.mockResolvedValue(mockResults);

    act(() => {
      result.current.runSimulation(mockConfig);
    });

    expect(result.current.isRunning).toBe(true);
    expect(result.current.results).toBeNull();
    expect(result.current.progress).toEqual({
      current: 0,
      total: mockConfig.numberOfSimulations,
    });
  });

  it('creates BlackjackSimulation instance with correct config', async () => {
    const { result } = renderHook(() => useSimulation());

    mockSimulationInstance.simulate.mockResolvedValue(mockResults);

    act(() => {
      result.current.runSimulation(mockConfig);
    });

    // Fast-forward the setTimeout
    act(() => {
      jest.runAllTimers();
    });

    await act(async () => {
      await Promise.resolve();
    });

    expect(MockedBlackjackSimulation).toHaveBeenCalledWith(mockConfig);
  });

  it('calls simulate with progress callback', async () => {
    const { result } = renderHook(() => useSimulation());

    const mockSimulate = jest.fn().mockImplementation((callback) => {
      // Simulate progress updates
      if (callback) {
        callback(50, 100);
        callback(100, 100);
      }
      return Promise.resolve(mockResults);
    });

    mockSimulationInstance.simulate = mockSimulate;

    act(() => {
      result.current.runSimulation(mockConfig);
    });

    // Fast-forward the setTimeout
    act(() => {
      jest.runAllTimers();
    });

    await act(async () => {
      await Promise.resolve();
    });

    expect(mockSimulate).toHaveBeenCalledWith(expect.any(Function));
  });

  it('updates progress during simulation', async () => {
    const { result } = renderHook(() => useSimulation());

    const mockSimulate = jest.fn().mockImplementation((callback) => {
      // Simulate progress updates
      if (callback) {
        callback(25, 100);
        callback(50, 100);
        callback(75, 100);
        callback(100, 100);
      }
      return Promise.resolve(mockResults);
    });

    mockSimulationInstance.simulate = mockSimulate;

    act(() => {
      result.current.runSimulation(mockConfig);
    });

    // Fast-forward the setTimeout
    act(() => {
      jest.runAllTimers();
    });

    await act(async () => {
      await Promise.resolve();
    });

    // Progress should be updated to final state
    expect(result.current.progress).toEqual({
      current: 100,
      total: 100,
    });
  });

  it('sets results and stops running when simulation completes', async () => {
    const { result } = renderHook(() => useSimulation());

    mockSimulationInstance.simulate.mockResolvedValue(mockResults);

    act(() => {
      result.current.runSimulation(mockConfig);
    });

    // Fast-forward the setTimeout
    act(() => {
      jest.runAllTimers();
    });

    await act(async () => {
      await Promise.resolve();
    });

    expect(result.current.isRunning).toBe(false);
    expect(result.current.results).toEqual(mockResults);
  });

  it('handles simulation errors gracefully', async () => {
    const { result } = renderHook(() => useSimulation());

    const consoleErrorSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});
    const mockError = new Error('Simulation failed');
    mockSimulationInstance.simulate.mockRejectedValue(mockError);

    act(() => {
      result.current.runSimulation(mockConfig);
    });

    // Fast-forward the setTimeout
    act(() => {
      jest.runAllTimers();
    });

    await act(async () => {
      await Promise.resolve();
    });

    expect(result.current.isRunning).toBe(false);
    expect(result.current.results).toBeNull();
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      'Simulation error:',
      mockError,
    );

    consoleErrorSpy.mockRestore();
  });

  it('clears previous results when starting new simulation', async () => {
    const { result } = renderHook(() => useSimulation());

    mockSimulationInstance.simulate.mockResolvedValue(mockResults);

    // Run first simulation
    act(() => {
      result.current.runSimulation(mockConfig);
    });

    act(() => {
      jest.runAllTimers();
    });

    await act(async () => {
      await Promise.resolve();
    });

    expect(result.current.results).toEqual(mockResults);

    // Start second simulation
    act(() => {
      result.current.runSimulation(mockConfig);
    });

    expect(result.current.results).toBeNull();
    expect(result.current.isRunning).toBe(true);
  });

  it('resets progress when starting new simulation', async () => {
    const { result } = renderHook(() => useSimulation());

    mockSimulationInstance.simulate.mockResolvedValue(mockResults);

    // Run first simulation
    act(() => {
      result.current.runSimulation(mockConfig);
    });

    act(() => {
      jest.runAllTimers();
    });

    await act(async () => {
      await Promise.resolve();
    });

    // Start second simulation with different config
    const newConfig = { ...mockConfig, numberOfSimulations: 200 };

    act(() => {
      result.current.runSimulation(newConfig);
    });

    expect(result.current.progress).toEqual({
      current: 0,
      total: 200,
    });
  });

  it('logs simulation start correctly', async () => {
    const { result } = renderHook(() => useSimulation());

    const consoleLogSpy = jest
      .spyOn(console, 'log')
      .mockImplementation(() => {});
    mockSimulationInstance.simulate.mockResolvedValue(mockResults);

    act(() => {
      result.current.runSimulation(mockConfig);
    });

    act(() => {
      jest.runAllTimers();
    });

    await act(async () => {
      await Promise.resolve();
    });

    expect(consoleLogSpy).toHaveBeenCalledWith(
      'Starting simulation with config:',
      mockConfig,
    );

    consoleLogSpy.mockRestore();
  });

  it('logs progress updates correctly', async () => {
    const { result } = renderHook(() => useSimulation());

    const consoleLogSpy = jest
      .spyOn(console, 'log')
      .mockImplementation(() => {});

    const mockSimulate = jest.fn().mockImplementation((callback) => {
      if (callback) {
        callback(50, 100);
      }
      return Promise.resolve(mockResults);
    });

    mockSimulationInstance.simulate = mockSimulate;

    act(() => {
      result.current.runSimulation(mockConfig);
    });

    act(() => {
      jest.runAllTimers();
    });

    await act(async () => {
      await Promise.resolve();
    });

    expect(consoleLogSpy).toHaveBeenCalledWith('Progress: 50 of 100');

    consoleLogSpy.mockRestore();
  });

  it('maintains function reference stability', () => {
    const { result, rerender } = renderHook(() => useSimulation());

    const firstRunSimulation = result.current.runSimulation;

    rerender();

    const secondRunSimulation = result.current.runSimulation;

    expect(firstRunSimulation).toBe(secondRunSimulation);
  });
});
