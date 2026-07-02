'use client';

import Lottie from 'lottie-react';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import animateTabAnimation from '@/app/animations/animate-tab.json';
import paginationAnimation from '@/app/animations/pagination-indicator.json';

const signalAnimation = {
  v: '5.12.2',
  fr: 60,
  ip: 0,
  op: 180,
  w: 420,
  h: 420,
  nm: 'Sayuru signal field',
  ddd: 0,
  assets: [],
  layers: [
    {
      ddd: 0,
      ind: 1,
      ty: 4,
      nm: 'outer orbit',
      sr: 1,
      ks: {
        o: { a: 0, k: 100 },
        r: { a: 1, k: [{ t: 0, s: [0] }, { t: 180, s: [360] }] },
        p: { a: 0, k: [210, 210, 0] },
        a: { a: 0, k: [0, 0, 0] },
        s: { a: 0, k: [100, 100, 100] },
      },
      shapes: [
        {
          ty: 'gr',
          it: [
            { ty: 'el', p: { a: 0, k: [0, 0] }, s: { a: 0, k: [310, 310] }, d: 1 },
            {
              ty: 'st',
              c: { a: 0, k: [0.839, 0.227, 0.184, 1] },
              o: { a: 0, k: 72 },
              w: { a: 0, k: 3 },
            },
            { ty: 'tr', p: { a: 0, k: [0, 0] }, a: { a: 0, k: [0, 0] }, s: { a: 0, k: [100, 100] }, r: { a: 0, k: 0 }, o: { a: 0, k: 100 } },
          ],
        },
        {
          ty: 'gr',
          it: [
            { ty: 'el', p: { a: 0, k: [155, 0] }, s: { a: 0, k: [22, 22] }, d: 1 },
            { ty: 'fl', c: { a: 0, k: [0.839, 0.227, 0.184, 1] }, o: { a: 0, k: 100 } },
            { ty: 'tr', p: { a: 0, k: [0, 0] }, a: { a: 0, k: [0, 0] }, s: { a: 0, k: [100, 100] }, r: { a: 0, k: 0 }, o: { a: 0, k: 100 } },
          ],
        },
      ],
      ip: 0,
      op: 180,
      st: 0,
      bm: 0,
    },
    {
      ddd: 0,
      ind: 2,
      ty: 4,
      nm: 'inner orbit',
      sr: 1,
      ks: {
        o: { a: 0, k: 100 },
        r: { a: 1, k: [{ t: 0, s: [0] }, { t: 180, s: [-360] }] },
        p: { a: 0, k: [210, 210, 0] },
        a: { a: 0, k: [0, 0, 0] },
        s: { a: 0, k: [100, 100, 100] },
      },
      shapes: [
        {
          ty: 'gr',
          it: [
            { ty: 'el', p: { a: 0, k: [0, 0] }, s: { a: 0, k: [184, 184] }, d: 1 },
            {
              ty: 'st',
              c: { a: 0, k: [0.137, 0.31, 0.835, 1] },
              o: { a: 0, k: 70 },
              w: { a: 0, k: 4 },
            },
            { ty: 'tr', p: { a: 0, k: [0, 0] }, a: { a: 0, k: [0, 0] }, s: { a: 0, k: [100, 100] }, r: { a: 0, k: 0 }, o: { a: 0, k: 100 } },
          ],
        },
        {
          ty: 'gr',
          it: [
            { ty: 'el', p: { a: 0, k: [92, 0] }, s: { a: 0, k: [18, 18] }, d: 1 },
            { ty: 'fl', c: { a: 0, k: [0.137, 0.31, 0.835, 1] }, o: { a: 0, k: 100 } },
            { ty: 'tr', p: { a: 0, k: [0, 0] }, a: { a: 0, k: [0, 0] }, s: { a: 0, k: [100, 100] }, r: { a: 0, k: 0 }, o: { a: 0, k: 100 } },
          ],
        },
      ],
      ip: 0,
      op: 180,
      st: 0,
      bm: 0,
    },
    {
      ddd: 0,
      ind: 3,
      ty: 4,
      nm: 'center mark',
      sr: 1,
      ks: {
        o: { a: 0, k: 100 },
        r: { a: 0, k: 0 },
        p: { a: 0, k: [210, 210, 0] },
        a: { a: 0, k: [0, 0, 0] },
        s: {
          a: 1,
          k: [
            { t: 0, s: [82, 82, 100] },
            { t: 90, s: [108, 108, 100] },
            { t: 180, s: [82, 82, 100] },
          ],
        },
      },
      shapes: [
        {
          ty: 'gr',
          it: [
            { ty: 'el', p: { a: 0, k: [0, 0] }, s: { a: 0, k: [86, 86] }, d: 1 },
            { ty: 'fl', c: { a: 0, k: [0.431, 0.294, 0.839, 1] }, o: { a: 0, k: 92 } },
            { ty: 'tr', p: { a: 0, k: [0, 0] }, a: { a: 0, k: [0, 0] }, s: { a: 0, k: [100, 100] }, r: { a: 0, k: 0 }, o: { a: 0, k: 100 } },
          ],
        },
      ],
      ip: 0,
      op: 180,
      st: 0,
      bm: 0,
    },
  ],
};

const animationMap = {
  signal: signalAnimation,
  tabs: animateTabAnimation,
  pagination: paginationAnimation,
};

export default function SignalLottie({
  className = '',
  variant = 'signal',
}: {
  className?: string;
  variant?: keyof typeof animationMap;
}) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <Lottie
      className={className}
      animationData={animationMap[variant]}
      loop={!prefersReducedMotion}
      autoplay={!prefersReducedMotion}
      aria-hidden="true"
    />
  );
}
