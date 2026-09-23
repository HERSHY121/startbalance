export type EntryType = 'spend' | 'balance_check' | 'topup' | 'period_start';

export type LedgerEntry = {
  id: string;
  type: EntryType;
  amount: number;
  merchant?: string;
  date: string;
  createdAt: string;
  note?: string;
};

export type AppState = {
  remaining: number | null;
  lastCheckedAt: string | null;
  periodStartedAt: string | null;
  entries: LedgerEntry[];
};

const STORAGE_KEY = 'startbalance-v1';

export const emptyState = (): AppState => ({
  remaining: null,
  lastCheckedAt: null,
  periodStartedAt: null,
  entries: [],
});

export function loadState(): AppState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return emptyState();
    const parsed = JSON.parse(raw) as AppState;
    if (!parsed || typeof parsed !== 'object') return emptyState();
    return {
      remaining: typeof parsed.remaining === 'number' ? parsed.remaining : null,
      lastCheckedAt: parsed.lastCheckedAt ?? null,
      periodStartedAt: parsed.periodStartedAt ?? null,
      entries: Array.isArray(parsed.entries) ? parsed.entries : [],
    };
  } catch {
    return emptyState();
  }
}

export function saveState(state: AppState): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export function todayISO(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

export function uid(): string {
  return `e_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
}

export function totalSpent(entries: LedgerEntry[]): number {
  return entries.filter((e) => e.type === 'spend').reduce((s, e) => s + e.amount, 0);
}

export function statusFromRemaining(remaining: number | null): {
  label: string;
  tone: 'ok' | 'low' | 'empty' | 'none';
} {
  if (remaining === null) return { label: 'Enter a balance to start', tone: 'none' };
  if (remaining <= 0) return { label: 'No balance left', tone: 'empty' };
  if (remaining < 10) return { label: 'Running low', tone: 'low' };
  if (remaining < 25) return { label: 'Enough for a small shop', tone: 'ok' };
  return { label: 'Enough for a normal shop', tone: 'ok' };
}

export function formatMoney(value: number): string {
  return value.toLocaleString('en-GB', { style: 'currency', currency: 'GBP' });
}

export function formatMoneySigned(value: number, type: EntryType): string {
  const abs = formatMoney(Math.abs(value));
  return type === 'spend' ? `−${abs}` : `+${abs}`;
}

export function formatCheckedAt(iso: string | null): string {
  if (!iso) return 'Not checked yet';
  return new Date(iso).toLocaleString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function formatDateLabel(isoDate: string): string {
  return new Date(`${isoDate}T12:00:00`).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
  });
}
