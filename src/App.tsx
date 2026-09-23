import { useState } from 'react';
import { PhoneFrame } from './components/PhoneFrame';
import { TabNav, type TabId } from './components/TabNav';
import { HomeScreen } from './screens/HomeScreen';
import { ActivityScreen } from './screens/ActivityScreen';
import { CardScreen } from './screens/CardScreen';
import { HelpScreen } from './screens/HelpScreen';
import { SetBalanceScreen } from './screens/SetBalanceScreen';
import { AddSpendModal } from './screens/AddSpendModal';
import { useLedger } from './hooks/useLedger';
import { appMeta } from './data/helpContent';
import './App.css';

type Overlay = 'none' | 'setBalance' | 'addSpend';

export default function App() {
  const ledger = useLedger();
  const [tab, setTab] = useState<TabId>('home');
  const [overlay, setOverlay] = useState<Overlay>('none');

  const openSetBalance = () => setOverlay('setBalance');
  const openAddSpend = () => {
    if (!ledger.hasBalance) {
      setOverlay('setBalance');
      return;
    }
    setOverlay('addSpend');
  };

  return (
    <div className="app-root">
      <aside className="desktop-blurb">
        <p className="blurb-brand">{appMeta.name}</p>
        <h1>{appMeta.tagline}</h1>
        <p>
          A companion tracker for parents and carers. Check balance by phone (
          {appMeta.phone}) or cashpoint, enter it here, then log spends. Local
          storage only — no live card API.
        </p>
        <p className="blurb-disclaimer">{appMeta.disclaimer}</p>
        <button
          type="button"
          className="btn btn-ghost desktop-reset"
          onClick={() => {
            if (window.confirm('Clear all tracked data?')) ledger.resetAll();
            setOverlay('none');
            setTab('home');
          }}
        >
          Clear trial data
        </button>
      </aside>

      <PhoneFrame>
        {overlay === 'setBalance' ? (
          <SetBalanceScreen
            ledger={ledger}
            onDone={() => {
              setOverlay('none');
              setTab('home');
            }}
            onCancel={() => setOverlay('none')}
          />
        ) : (
          <>
            <main className="app-main" id="main">
              {tab === 'home' && (
                <HomeScreen
                  ledger={ledger}
                  onAddSpend={openAddSpend}
                  onUpdateBalance={openSetBalance}
                  onWhatCanIBuy={() => setTab('help')}
                  onHowToCheck={() => setTab('help')}
                />
              )}
              {tab === 'activity' && (
                <ActivityScreen
                  ledger={ledger}
                  onAddSpend={openAddSpend}
                  onEnterBalance={openSetBalance}
                />
              )}
              {tab === 'card' && (
                <CardScreen
                  ledger={ledger}
                  onUpdateBalance={openSetBalance}
                  onReset={() => {
                    ledger.resetAll();
                    setTab('home');
                  }}
                />
              )}
              {tab === 'help' && <HelpScreen />}
            </main>
            <TabNav active={tab} onChange={setTab} />
            {overlay === 'addSpend' && (
              <AddSpendModal ledger={ledger} onClose={() => setOverlay('none')} />
            )}
          </>
        )}
      </PhoneFrame>
    </div>
  );
}
