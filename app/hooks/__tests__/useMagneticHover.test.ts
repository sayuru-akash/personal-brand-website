import { renderHook, act } from '@testing-library/react';
import { useMagneticHover } from '../useMagneticHover';
import { MouseEvent } from 'react';

describe('useMagneticHover', () => {
  it('should initialize with x and y motion values at 0', () => {
    const { result } = renderHook(() => useMagneticHover(0.3));

    expect(result.current.x.get()).toBe(0);
    expect(result.current.y.get()).toBe(0);
  });

  it('should return mouse event handlers', () => {
    const { result } = renderHook(() => useMagneticHover(0.3));

    expect(typeof result.current.handleMouseMove).toBe('function');
    expect(typeof result.current.handleMouseLeave).toBe('function');
  });

  it('should calculate magnetic pull based on cursor position and strength', () => {
    const strength = 0.5;
    const { result } = renderHook(() => useMagneticHover(strength));

    // Mock element with getBoundingClientRect
    const mockElement = {
      getBoundingClientRect: () => ({
        left: 100,
        top: 100,
        width: 200,
        height: 200,
        right: 300,
        bottom: 300,
        x: 100,
        y: 100,
        toJSON: () => {},
      }),
    } as HTMLElement;

    // Create mock mouse event
    const mockEvent = {
      currentTarget: mockElement,
      clientX: 250, // 50px right of center (200)
      clientY: 250, // 50px below center (200)
    } as MouseEvent<HTMLElement>;

    act(() => {
      result.current.handleMouseMove(mockEvent);
    });

    // Expected: deltaX = 250 - 200 = 50, deltaY = 250 - 200 = 50
    // With strength 0.5: x = 50 * 0.5 = 25, y = 50 * 0.5 = 25
    expect(result.current.x.get()).toBe(25);
    expect(result.current.y.get()).toBe(25);
  });

  it('should reset position to 0 on mouse leave', () => {
    const { result } = renderHook(() => useMagneticHover(0.3));

    // Mock element
    const mockElement = {
      getBoundingClientRect: () => ({
        left: 100,
        top: 100,
        width: 200,
        height: 200,
        right: 300,
        bottom: 300,
        x: 100,
        y: 100,
        toJSON: () => {},
      }),
    } as HTMLElement;

    const mockEvent = {
      currentTarget: mockElement,
      clientX: 250,
      clientY: 250,
    } as MouseEvent<HTMLElement>;

    // Set position with mouse move
    act(() => {
      result.current.handleMouseMove(mockEvent);
    });

    expect(result.current.x.get()).not.toBe(0);
    expect(result.current.y.get()).not.toBe(0);

    // Reset with mouse leave
    act(() => {
      result.current.handleMouseLeave();
    });

    expect(result.current.x.get()).toBe(0);
    expect(result.current.y.get()).toBe(0);
  });

  it('should use default strength of 0.25 when not provided', () => {
    const { result } = renderHook(() => useMagneticHover());

    const mockElement = {
      getBoundingClientRect: () => ({
        left: 0,
        top: 0,
        width: 100,
        height: 100,
        right: 100,
        bottom: 100,
        x: 0,
        y: 0,
        toJSON: () => {},
      }),
    } as HTMLElement;

    const mockEvent = {
      currentTarget: mockElement,
      clientX: 100, // 50px right of center (50)
      clientY: 100, // 50px below center (50)
    } as MouseEvent<HTMLElement>;

    act(() => {
      result.current.handleMouseMove(mockEvent);
    });

    // Expected: deltaX = 100 - 50 = 50, deltaY = 100 - 50 = 50
    // With default strength 0.25: x = 50 * 0.25 = 12.5, y = 50 * 0.25 = 12.5
    expect(result.current.x.get()).toBe(12.5);
    expect(result.current.y.get()).toBe(12.5);
  });

  it('should apply different strengths correctly', () => {
    const { result: result1 } = renderHook(() => useMagneticHover(0.1));
    const { result: result2 } = renderHook(() => useMagneticHover(0.8));

    const mockElement = {
      getBoundingClientRect: () => ({
        left: 0,
        top: 0,
        width: 100,
        height: 100,
        right: 100,
        bottom: 100,
        x: 0,
        y: 0,
        toJSON: () => {},
      }),
    } as HTMLElement;

    const mockEvent = {
      currentTarget: mockElement,
      clientX: 100,
      clientY: 100,
    } as MouseEvent<HTMLElement>;

    act(() => {
      result1.current.handleMouseMove(mockEvent);
      result2.current.handleMouseMove(mockEvent);
    });

    // With strength 0.1: 50 * 0.1 = 5
    expect(result1.current.x.get()).toBe(5);
    expect(result1.current.y.get()).toBe(5);

    // With strength 0.8: 50 * 0.8 = 40
    expect(result2.current.x.get()).toBe(40);
    expect(result2.current.y.get()).toBe(40);
  });
});
