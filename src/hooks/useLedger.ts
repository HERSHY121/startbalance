import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  emptyState,
  loadState,
  saveState,
  todayISO,
  uid,
  totalSpent,
  statusFromRemaining,
  type AppState,
  type LedgerEntry,
} from '../data/storage';

function round2(n: number): number {
  return Math.round(n * 100) / 100;
}

export function useLedger() {
  const [state, setState] = useState<AppState>(() =>
    typeof window !== 'undefined' ? loadState() : emptyState(),
  );

  useEffect(() => {
    saveState(state);
  }, [state]);

  const spent = useMemo(() => totalSpent(state.entries), [state.entries]);
  const status = useMemo(
    () => statusFromRemaining(state.remaining),
    [state.remaining],
  );

  const setBalance = useCallback(
    (amount: number, opts?: { clearSpends?: boolean; asTopUp?: boolean }) => {
      const now = new Date().toISOString();
      const date = todayISO();
      setState((prev) => {
        const entries = opts?.clearSpends ? [] : prev.entries;
        let type: LedgerEntry['type'] = 'balance_check';
        if (opts?.asTopUp) type = 'topup';
        else if (prev.remaining === null || opts?.clearSpends) type = 'period_start';

        const entry: LedgerEntry = {
          id: uid(),
          type,
          amount: round2(amount),
          date,
          createdAt: now,
          note:
            type === 'topup'
              ? 'Top-up / new balance entered'
              : type === 'period_start'
                ? 'Starting balance'
                : 'Balance checked and entered',
        };

        return {
          remaining: round2(amount),
          lastCheckedAt: now,
          periodStartedAt:
            opts?.clearSpends || !prev.periodStartedAt ? now : prev.periodStartedAt,
          entries: [entry, ...entries],
        };
      });
    },
    [],
  );

  const addSpend = useCallback((amount: number, merchant: string, date: string) => {
    const now = new Date().toISOString();
    const rounded = round2(amount);
    setState((prev) => {
      if (prev.remaining === null) return prev;
      const entry: LedgerEntry = {
        id: uid(),
        type: 'spend',
        amount: rounded,
        merchant: merchant.trim() || 'Shop',
        date: date || todayISO(),
        createdAt: now,
      };
      return {
        ...prev,
        remaining: round2(prev.remaining - rounded),
        entries: [entry, ...prev.entries],
      };
    });
  }, []);

  const deleteSpend = useCallback((id: string) => {
    setState((prev) => {
      const entry = prev.entries.find((e) => e.id === id);
      if (!entry || entry.type !== 'spend') return prev;
      const remaining =
        prev.remaining === null ? null : round2(prev.remaining + entry.amount);
      return {
        ...prev,
        remaining,
        entries: prev.entries.filter((e) => e.id !== id),
      };
    });
  }, []);

  const recalculate = useCallback(() => {
    setState((prev) => ({ ...prev }));
  }, []);

  const resetAll = useCallback(() => {
    setState(emptyState());
  }, []);

  const loadDemo = useCallback(() => {
    const now = new Date().toISOString();
    setState({
      remaining: 42.5,
      lastCheckedAt: now,
      periodStartedAt: now,
      entries: [
        {
          id: uid(),
          type: 'spend',
          amount: 8.4,
          merchant: 'Tesco Express',
          date: '2026-09-22',
          createdAt: now,
        },
        {
          id: uid(),
          type: 'spend',
          amount: 12.15,
          merchant: 'Asda',
          date: '2026-09-21',
          createdAt: now,
        },
        {
          id: uid(),
          type: 'spend',
          amount: 3.2,
          merchant: 'Corner fruit shop',
          date: '2026-09-20',
          createdAt: now,
        },
        {
          id: uid(),
          type: 'topup',
          amount: 34,
          date: '2026-09-09',
          createdAt: now,
          note: 'Top-up / new balance entered',
        },
        {
          id: uid(),
          type: 'period_start',
          amount: 66.25,
          date: '2026-09-09',
          createdAt: now,
          note: 'Starting balance (demo)',
        },
      ],
    });
  }, []);

  return {
    state,
    spent,
    status,
    setBalance,
    addSpend,
    deleteSpend,
    recalculate,
    resetAll,
    loadDemo,
    hasBalance: state.remaining !== null,
  };
}

export type LedgerApi = ReturnType<typeof useLedger>;
