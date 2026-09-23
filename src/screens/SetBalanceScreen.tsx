import { useState, type FormEvent } from 'react';
import { appMeta } from '../data/helpContent';
import { DisclaimerBadge } from '../components/DisclaimerBadge';
import type { LedgerApi } from '../hooks/useLedger';

type Props = {
  ledger: LedgerApi;
  onDone: () => void;
  onCancel: () => void;
};

export function SetBalanceScreen({ ledger, onDone, onCancel }: Props) {
  const isFirst = !ledger.hasBalance;
  const [amount, setAmount] = useState('');
  const [clearSpends, setClearSpends] = useState(isFirst);
  const [asTopUp, setAsTopUp] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const n = Number.parseFloat(amount.replace(/£/g, '').replace(/,/g, ''));
    if (!Number.isFinite(n) || n < 0) {
      setError('Enter a valid amount (0 or more).');
      return;
    }
    ledger.setBalance(n, {
      clearSpends: isFirst ? true : clearSpends,
      asTopUp: !isFirst && asTopUp,
    });
    onDone();
  };

  return (
    <div className="screen link-screen">
      <header className="screen-header">
        <div>
          <p className="app-kicker">{appMeta.name}</p>
          <h1 className="screen-title">
            {isFirst ? 'Enter your balance' : 'Update balance'}
          </h1>
        </div>
        <DisclaimerBadge />
      </header>

      <p className="panel-text intro-text">
        I’ve just checked by phone or cashpoint — the balance is:
      </p>

      <form className="link-form" onSubmit={handleSubmit}>
        <label className="field">
          <span>Amount on card</span>
          <input
            type="text"
            inputMode="decimal"
            autoComplete="off"
            placeholder="e.g. 42.50"
            value={amount}
            onChange={(e) => {
              setAmount(e.target.value);
              setError('');
            }}
            autoFocus
          />
        </label>

        {!isFirst && (
          <>
            <label className="check-row">
              <input type="checkbox" checked={asTopUp} onChange={(e) => setAsTopUp(e.target.checked)} />
              <span>This is after a top-up (log as top-up)</span>
            </label>
            <label className="check-row">
              <input type="checkbox" checked={clearSpends} onChange={(e) => setClearSpends(e.target.checked)} />
              <span>Start a new period (clear old spends)</span>
            </label>
          </>
        )}

        {error && <p className="form-error" role="alert">{error}</p>}

        <button type="submit" className="btn btn-primary">Save balance</button>
        {!isFirst && (
          <button type="button" className="btn btn-ghost" onClick={onCancel}>Cancel</button>
        )}
      </form>

      <p className="muted-note" style={{ marginTop: 16 }}>
        Saved only on this device. Not sent to NHS or your card provider.
      </p>
    </div>
  );
}
