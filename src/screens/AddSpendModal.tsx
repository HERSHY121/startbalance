import { useState, type FormEvent } from 'react';
import { Modal } from '../components/Modal';
import { todayISO } from '../data/storage';
import type { LedgerApi } from '../hooks/useLedger';

type Props = {
  ledger: LedgerApi;
  onClose: () => void;
};

export function AddSpendModal({ ledger, onClose }: Props) {
  const [amount, setAmount] = useState('');
  const [merchant, setMerchant] = useState('');
  const [date, setDate] = useState(todayISO());
  const [error, setError] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const n = Number.parseFloat(amount.replace(/£/g, '').replace(/,/g, ''));
    if (!Number.isFinite(n) || n <= 0) {
      setError('Enter a spend greater than £0.');
      return;
    }
    ledger.addSpend(n, merchant, date);
    onClose();
  };

  return (
    <Modal title="Log a spend" onClose={onClose}>
      <form className="link-form" onSubmit={handleSubmit}>
        <label className="field">
          <span>Amount</span>
          <input
            type="text"
            inputMode="decimal"
            placeholder="e.g. 8.40"
            value={amount}
            onChange={(e) => { setAmount(e.target.value); setError(''); }}
            autoFocus
          />
        </label>
        <label className="field">
          <span>Shop name (optional)</span>
          <input type="text" placeholder="e.g. Tesco Express" value={merchant} onChange={(e) => setMerchant(e.target.value)} />
        </label>
        <label className="field">
          <span>Date</span>
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        </label>
        {error && <p className="form-error" role="alert">{error}</p>}
        <button type="submit" className="btn btn-primary">Save spend</button>
        <button type="button" className="btn btn-ghost" onClick={onClose}>Cancel</button>
      </form>
    </Modal>
  );
}
