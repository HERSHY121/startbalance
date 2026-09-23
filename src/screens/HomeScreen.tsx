import { formatMoney, formatCheckedAt } from '../data/storage';
import { appMeta } from '../data/helpContent';
import { DisclaimerBadge } from '../components/DisclaimerBadge';
import type { LedgerApi } from '../hooks/useLedger';

type Props = {
  ledger: LedgerApi;
  onAddSpend: () => void;
  onUpdateBalance: () => void;
  onWhatCanIBuy: () => void;
  onHowToCheck: () => void;
};

function spendsThisWeek(entries: LedgerApi['state']['entries']): number {
  const now = new Date();
  const day = now.getDay();
  const mondayOffset = day === 0 ? -6 : 1 - day;
  const monday = new Date(now);
  monday.setHours(0, 0, 0, 0);
  monday.setDate(now.getDate() + mondayOffset);
  const mondayIso = `${monday.getFullYear()}-${String(monday.getMonth() + 1).padStart(2, '0')}-${String(monday.getDate()).padStart(2, '0')}`;
  return entries.filter((e) => e.type === 'spend' && e.date >= mondayIso).length;
}

export function HomeScreen({
  ledger,
  onAddSpend,
  onUpdateBalance,
  onWhatCanIBuy,
  onHowToCheck,
}: Props) {
  const { state, spent, status, hasBalance, loadDemo } = ledger;
  const weekSpends = spendsThisWeek(state.entries);

  if (!hasBalance) {
    return (
      <div className="screen home-screen">
        <header className="screen-header">
          <div>
            <p className="app-kicker">{appMeta.name}</p>
            <h1 className="screen-title">Your balance</h1>
          </div>
          <DisclaimerBadge />
        </header>
        <section className="empty-hero">
          <div className="empty-icon" aria-hidden="true">
            £
          </div>
          <h2>Track what you’ve got left</h2>
          <p>
            Check your Healthy Start card by phone ({appMeta.phone}) or at a
            cashpoint, then enter the amount here. Log spends as you go — nothing
            connects to a live card API.
          </p>
          <button type="button" className="btn btn-primary" onClick={onUpdateBalance}>
            Enter balance
          </button>
          <button type="button" className="btn btn-ghost" onClick={loadDemo}>
            Load demo data
          </button>
        </section>
      </div>
    );
  }

  return (
    <div className="screen home-screen">
      <header className="screen-header">
        <div>
          <p className="app-kicker">{appMeta.name}</p>
          <h1 className="screen-title">Your balance</h1>
        </div>
        <DisclaimerBadge />
      </header>

      <section className="balance-hero" aria-live="polite">
        <p className="balance-label">Estimated left</p>
        <p className="balance-amount">{formatMoney(state.remaining ?? 0)}</p>
        <p className="balance-meta">
          Updated {formatCheckedAt(state.lastCheckedAt)}
        </p>
        <span className={`status-chip status-${status.tone}`}>{status.label}</span>
      </section>

      <div className="stat-row">
        <div className="stat-card">
          <span className="stat-label">Logged items</span>
          <span className="stat-value">{state.entries.length}</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">Spends this week</span>
          <span className="stat-value">{weekSpends}</span>
        </div>
      </div>

      <div className="home-actions">
        <button type="button" className="btn btn-primary" onClick={onAddSpend}>
          Log a spend
        </button>
        <button type="button" className="btn btn-secondary" onClick={onUpdateBalance}>
          Update balance
        </button>
      </div>

      <p className="section-label">Quick links</p>
      <div className="quick-links">
        <button type="button" className="btn btn-chip" onClick={onWhatCanIBuy}>
          What can I buy?
        </button>
        <button type="button" className="btn btn-chip" onClick={onHowToCheck}>
          How to check balance
        </button>
      </div>

      <section className="info-panel">
        <h2 className="panel-title">Companion tracker</h2>
        <p className="panel-text">
          Figures here are what you entered. Re-check by phone ({appMeta.phone}) or
          cashpoint when you need the official balance, then tap Update balance.
        </p>
        <p className="muted-note" style={{ marginTop: 10 }}>
          Spent this period: {formatMoney(spent)}
        </p>
      </section>
    </div>
  );
}
