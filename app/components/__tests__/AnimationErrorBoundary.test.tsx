import { render, screen } from '@testing-library/react';
import AnimationErrorBoundary from '../AnimationErrorBoundary';

// Component that throws an error
const ThrowError = () => {
  throw new Error('Test error');
};

// Component that renders successfully
const SuccessComponent = () => <div>Success content</div>;

describe('AnimationErrorBoundary', () => {
  // Suppress console.error for these tests
  const originalError = console.error;
  beforeAll(() => {
    console.error = jest.fn();
  });
  afterAll(() => {
    console.error = originalError;
  });

  it('renders children when there is no error', () => {
    render(
      <AnimationErrorBoundary>
        <SuccessComponent />
      </AnimationErrorBoundary>
    );

    expect(screen.getByText('Success content')).toBeTruthy();
  });

  it('renders fallback UI when an error occurs', () => {
    render(
      <AnimationErrorBoundary fallbackLabel="Test Section">
        <ThrowError />
      </AnimationErrorBoundary>
    );

    expect(screen.getByText('Test Section')).toBeTruthy();
    expect(
      screen.getByText(/This section is still readable in static mode/)
    ).toBeTruthy();
  });

  it('uses default fallback label when not provided', () => {
    render(
      <AnimationErrorBoundary>
        <ThrowError />
      </AnimationErrorBoundary>
    );

    expect(screen.getByText('Section unavailable')).toBeTruthy();
  });

  it('logs error to console in development', () => {
    const originalEnv = process.env.NODE_ENV;
    process.env.NODE_ENV = 'development';

    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();

    render(
      <AnimationErrorBoundary>
        <ThrowError />
      </AnimationErrorBoundary>
    );

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      'Animation boundary caught an error:',
      expect.any(Error),
      expect.any(Object)
    );

    consoleErrorSpy.mockRestore();
    process.env.NODE_ENV = originalEnv;
  });
});
