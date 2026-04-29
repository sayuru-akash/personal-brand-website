'use client';

import { useReducedMotion } from '@/hooks/useReducedMotion';

/**
 * Demo component to test the useReducedMotion hook.
 * This component displays the current state of the prefers-reduced-motion setting.
 */
export function ReducedMotionDemo() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="p-8 border rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Reduced Motion Detection</h2>
      <p className="mb-2">
        <strong>Prefers Reduced Motion:</strong>{' '}
        <span className={prefersReducedMotion ? 'text-green-600' : 'text-red-600'}>
          {prefersReducedMotion ? 'Yes' : 'No'}
        </span>
      </p>
      <p className="text-sm text-gray-600">
        {prefersReducedMotion
          ? 'Animations will be disabled or reduced.'
          : 'Animations will run normally.'}
      </p>
      <div className="mt-4 p-4 bg-gray-100 rounded">
        <p className="text-xs text-gray-700">
          To test: Go to your system settings and toggle &quot;Reduce motion&quot; or &quot;Prefers reduced motion&quot;.
          This component will update automatically.
        </p>
      </div>
    </div>
  );
}
