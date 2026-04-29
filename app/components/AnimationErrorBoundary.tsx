'use client';

import { Component, type ErrorInfo, type ReactNode } from 'react';

interface AnimationErrorBoundaryProps {
  children: ReactNode;
  fallbackLabel?: string;
}

interface AnimationErrorBoundaryState {
  hasError: boolean;
}

export default class AnimationErrorBoundary extends Component<
  AnimationErrorBoundaryProps,
  AnimationErrorBoundaryState
> {
  state: AnimationErrorBoundaryState = {
    hasError: false,
  };

  static getDerivedStateFromError(): AnimationErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Animation boundary caught an error:', error, errorInfo);
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <section className="mx-auto max-w-[1400px] px-5 py-24 sm:px-8 lg:px-12">
          <div className="border-t border-neutral-200 pt-8">
            <p className="text-sm uppercase tracking-[0.18em] text-neutral-500">
              {this.props.fallbackLabel ?? 'Section unavailable'}
            </p>
            <p className="mt-4 max-w-[42rem] text-base text-neutral-700">
              This section is still readable in static mode, but its animation layer failed to load.
            </p>
          </div>
        </section>
      );
    }

    return this.props.children;
  }
}
