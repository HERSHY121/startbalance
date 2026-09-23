import { formatMoneySigned, formatDateLabel } from '../data/storage';
import { DisclaimerBadge } from '../components/DisclaimerBadge';
import type { LedgerApi } from '../hooks/useLedger';

type Props = {
  ledger: LedgerApi;
  onAddSpend: () => void;
  onEnterBalance: () => void;
};

function entryTitle(type: string, merchant?: string, note?: string): string {
  if (type === 'spend') return merchant || 'Shop';
  if (type === 'balance_check') return 'Balance check entered';
  if (type === 'topup') return 'Top-up / new balance';
  if (type === 'period_start') return note || 'Period started';
  return note || type;
}

export function ActivityScreen({ ledger, onAddSpend, onEnterBalance }: Props) {
  const { state, deleteSpend, hasBalance } = ledger;
  const list = state.entries;

  return (
    <div className="screen activity-screen">
      <header className="screen-header">
        <div>
          <p className="app-kicker">This period</p>
          <h1 className="screen-title">Activity</h1>
        </div>
        <DisclaimerBadge />
      </header>

      {!hasBalance ? (
        <div className="empty-state" role="status">
          <div className="empty-icon" aria-hidden="true">
            ○
          </div>
          <h2>Nothing logged yet</h2>
          <p>Enter a balance first, then log spends as you shop.</p>
          <button type="button" className="btn btn-primary" onClick={onEnterBalance}>
            Enter balance
          </button>
        </div>
      ) : list.length === 0 ? (
        <div className="empty-state" role="status">
          <div className="empty-icon" aria-hidden="true">
            ○
          </div>
          <h2>No activity yet</h2>
          <p>Log a spend after you shop, or update your balance after a check.</p>
          <button type="button" className="btn btn-primary" onClick={onAddSpend}>
            Log a spend
          </button>
        </div>
      ) : (
        <>
          <ul className="tx-list">
            {list.map((tx) => (
              <li key={tx.id} className="tx-item">
                <div className="tx-main">
                  <span className={`tx-dot ${tx.type}`} aria-hidden="true" />
                  <div>
                    <p className="tx-merchant">
                      {entryTitle(tx.type, tx.merchant, tx.note)}
                    </p>
                    <p className="tx-date">{formatDateLabel(tx.date)}</p>
                  </div>
                </div>
                <div className="tx-right">
                  <p
                    className={`tx-amount ${tx.type === 'spend' ? 'debit' : 'credit'}`}
                  >
                    {formatMoneySigned(tx.amount, tx.type)}
                  </p>
                  {tx.type === 'spend' && (
                    <button
                      type="button"
                      className="tx-delete"
                      onClick={() => {
                        if (
                          window.confirm(
                            'Delete this spend and add the amount back to remaining?',
                          )
                        ) {
                          deleteSpend(tx.id);
                        }
                      }}
                    >
                      Delete
                    </button>
                  )}
                </div>
              </li>
            ))}
          </ul>
          <p className="muted-note" style={{ marginTop: 16 }}>
            Deleting a spend restores that amount to your remaining balance.
          </p>
        </>
      )}
    </div>
  );
}
