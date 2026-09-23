import type { ReactNode } from 'react';

type Props = { children: ReactNode; showStatusBar?: boolean };

export function PhoneFrame({ children, showStatusBar = true }: Props) {
  return (
    <div className="phone-shell">
      <div className="phone-frame">
        {showStatusBar && (
          <div className="status-bar" aria-hidden="true">
            <span className="status-time">9:41</span>
            <span className="status-icons">
              <span className="signal" />
              <span className="wifi" />
              <span className="battery" />
            </span>
          </div>
        )}
        <div className="phone-screen">{children}</div>
        <div className="home-indicator" aria-hidden="true" />
      </div>
    </div>
  );
}
