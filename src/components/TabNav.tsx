export type TabId = 'home' | 'activity' | 'recipes' | 'card' | 'help' | 'admin';

type Props = {
  active: TabId;
  onChange: (tab: TabId) => void;
  showAdmin?: boolean;
};

const tabs: { id: TabId; label: string; icon: string }[] = [
  { id: 'home', label: 'Home', icon: '⌂' },
  { id: 'activity', label: 'Activity', icon: '☰' },
  { id: 'recipes', label: 'Recipes', icon: '✦' },
  { id: 'card', label: 'Card', icon: '▭' },
  { id: 'help', label: 'Help', icon: '?' },
];

export function TabNav({ active, onChange, showAdmin = false }: Props) {
  const visibleTabs = showAdmin
    ? [...tabs, { id: 'admin' as const, label: 'Admin', icon: '⚙' }]
    : tabs;

  return (
    <nav className={`tab-nav${showAdmin ? ' has-admin' : ''}`} aria-label="Main">
      {visibleTabs.map((tab) => (
        <button
          key={tab.id}
          type="button"
          className={`tab-btn${active === tab.id ? ' active' : ''}`}
          aria-current={active === tab.id ? 'page' : undefined}
          onClick={() => onChange(tab.id)}
        >
          <span className="tab-icon" aria-hidden="true">
            {tab.icon}
          </span>
          <span className="tab-label">{tab.label}</span>
        </button>
      ))}
    </nav>
  );
}
