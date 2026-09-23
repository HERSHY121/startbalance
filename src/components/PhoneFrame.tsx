import type { ReactNode } from 'react';

type Props = { children: ReactNode };

export function PhoneFrame({ children }: Props) {
  return (
    <div className="phone-shell">
      <div className="phone-frame">
        <div className="phone-screen">{children}</div>
        <div className="home-indicator" aria-hidden="true" />
      </div>
    </div>
  );
}
