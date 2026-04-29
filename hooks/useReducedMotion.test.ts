import { renderHook, waitFor } from '@testing-library/react';
import { useReducedMotion } from './useReducedMotion';

describe('useReducedMotion', () => {
  let matchMediaMock: jest.Mock;
  let listeners: Array<(event: MediaQueryListEvent) => void> = [];

  beforeEach(() => {
    listeners = [];
    
    // Mock window.matchMedia
    matchMediaMock = jest.fn().mockImplementation((query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addEventListener: jest.fn((event: string, handler: (event: MediaQueryListEvent) => void) => {
        listeners.push(handler);
      }),
      removeEventListener: jest.fn((event: string, handler: (event: MediaQueryListEvent) => void) => {
        listeners = listeners.filter(l => l !== handler);
      }),
      dispatchEvent: jest.fn(),
    }));

    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: matchMediaMock,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return false when prefers-reduced-motion is not set', () => {
    const { result } = renderHook(() => useReducedMotion());
    expect(result.current).toBe(false);
  });

  it('should return true when prefers-reduced-motion is set', () => {
    matchMediaMock.mockImplementation((query: string) => ({
      matches: true,
      media: query,
      onchange: null,
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    }));

    const { result } = renderHook(() => useReducedMotion());
    expect(result.current).toBe(true);
  });

  it('should update when media query changes', async () => {
    const { result } = renderHook(() => useReducedMotion());
    
    // Initially false
    expect(result.current).toBe(false);

    // Simulate media query change
    const changeEvent = { matches: true } as MediaQueryListEvent;
    listeners.forEach(listener => listener(changeEvent));

    // Wait for state update
    await waitFor(() => {
      expect(result.current).toBe(true);
    });
  });

  it('should clean up event listener on unmount', () => {
    const removeEventListenerSpy = jest.fn();
    
    matchMediaMock.mockImplementation((query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addEventListener: jest.fn(),
      removeEventListener: removeEventListenerSpy,
      dispatchEvent: jest.fn(),
    }));

    const { unmount } = renderHook(() => useReducedMotion());
    
    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith('change', expect.any(Function));
  });

  it('should call matchMedia with correct query', () => {
    renderHook(() => useReducedMotion());
    expect(matchMediaMock).toHaveBeenCalledWith('(prefers-reduced-motion: reduce)');
  });
});
