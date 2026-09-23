export type TabId = 'home' | 'activity' | 'card' | 'help';

type Props = {
  active: TabId;
  onChange: (tab: TabId) => void;
};

const tabs: { id: TabId; label: string; icon: string }[] = [
  { id: 'home', label: 'Home', icon: '⌂' },
  { id: 'activity', label: 'Activity', icon: '☰' },
  { id: 'card', label: 'Card', icon: '▭' },
  { id: 'help', label: 'Help', icon: '?' },
];

export function TabNav({ active, onChange }: Props) {
  return (
    <nav className="tab-nav" aria-label="Main">
      {tabs.map((tab) => (
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
