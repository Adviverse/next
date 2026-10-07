'use client';
import { createElement, useEffect } from 'react';

export interface AdSlotProps {
  tag: string;
  sizes?: string;
}

/** <AdSlot tag="tk_…" sizes="300x250" /> — client component rendering an <adviverse-ad> custom element. */
export function AdSlot({ tag, sizes }: AdSlotProps) {
  useEffect(() => {
    // Client only: registers <adviverse-ad>. Never runs during SSR.
    void import('@adviverse/element');
  }, []);
  return createElement('adviverse-ad', { tag, sizes });
}

export default AdSlot;
