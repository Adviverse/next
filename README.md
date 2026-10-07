# @adviverse/next

Next.js (App Router / Pages) `<AdSlot>` client component for Adviverse. The `'use client'` directive is preserved; `@adviverse/element` is imported in a `useEffect`, so SSR renders only the empty `<adviverse-ad>` host.

```bash
npm i @adviverse/next
```

```tsx
import { AdSlot } from '@adviverse/next';

export default function Page() {
  return <AdSlot tag="tk_…" sizes="300x250" />;
}
```
