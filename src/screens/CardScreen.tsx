import { DisclaimerBadge } from '../components/DisclaimerBadge';
import { formatMoney } from '../data/storage';
import { appMeta } from '../data/helpContent';
import type { LedgerApi } from '../hooks/useLedger';

type Props = {
  ledger: LedgerApi;
  onUpdateBalance: () => void;
  onReset: () => void;
};

export function CardScreen({ ledger, onUpdateBalance, onReset }: Props) {
  const remaining = ledger.state.remaining;

  return (
    <div className="screen card-screen">
      <header className="screen-header">
        <div>
          <p className="app-kicker">Your prepaid card</p>
          <h1 className="screen-title">Card</h1>
        </div>
        <DisclaimerBadge />
      </header>

      <div className="plastic-card">
        <div className="plastic-top">
          <span className="plastic-brand">{appMeta.name}</span>
          <span className="card-status status-active">
            {ledger.hasBalance ? 'Tracking' : 'Not set up'}
          </span>
        </div>
        <div className="plastic-mid">
          <span className="plastic-balance-label">Estimated balance</span>
          {ledger.hasBalance && remaining !== null ? (
            <p className="plastic-balance">{formatMoney(remaining)}</p>
          ) : (
            <p className="plastic-balance placeholder">Enter a balance</p>
          )}
        </div>
        <div className="plastic-bottom">
          <div>
            <span className="plastic-label">Official check</span>
            <span className="plastic-value">Phone / ATM</span>
          </div>
          <div>
            <span className="plastic-label">App storage</span>
            <span className="plastic-value">This device</span>
          </div>
        </div>
      </div>

      <section className="info-panel">
        <h2 className="panel-title">No live card link</h2>
        <p className="panel-text">
          StartBalance cannot see your real card. Check balance on {appMeta.phone}{' '}
          or at a cashpoint, then update the amount in the app.
        </p>
      </section>

      <div className="home-actions">
        <button type="button" className="btn btn-primary" onClick={onUpdateBalance}>
          Update balance
        </button>
        <button
          type="button"
          className="btn btn-ghost"
          onClick={() => {
            if (window.confirm('Clear all tracked data on this device?')) onReset();
          }}
        >
          Clear all data
        </button>
      </div>

      <section className="action-list" aria-label="Official actions (stubs)">
        <button type="button" className="action-row" disabled>
          <span>Report lost or stolen (official)</span>
          <span className="action-chevron" aria-hidden="true">
            ›
          </span>
        </button>
        <button type="button" className="action-row" disabled>
          <span>PIN reminder (official)</span>
          <span className="action-chevron" aria-hidden="true">
            ›
          </span>
        </button>
      </section>
    </div>
  );
}
