import { useState } from 'react'
import { PhoneFrame } from './components/PhoneFrame'
import { TabNav, type TabId } from './components/TabNav'
import { HomeScreen } from './screens/HomeScreen'
import { ActivityScreen } from './screens/ActivityScreen'
import { CardScreen } from './screens/CardScreen'
import { HelpScreen } from './screens/HelpScreen'
import { SetBalanceScreen } from './screens/SetBalanceScreen'
import { AddSpendModal } from './screens/AddSpendModal'
import { AuthScreen } from './screens/AuthScreen'
import { AuthProvider, useAuth } from './hooks/useAuth'
import { useLedger } from './hooks/useLedger'
import { appMeta } from './data/helpContent'
import './App.css'

type Overlay = 'none' | 'setBalance' | 'addSpend'

function MainApp({
  syncConfigured,
  userId,
}: {
  syncConfigured: boolean
  userId: string | null
}) {
  const { signOut, user, isAdmin } = useAuth()
  const ledger = useLedger(userId)
  const [tab, setTab] = useState<TabId>('home')
  const [overlay, setOverlay] = useState<Overlay>('none')

  const openSetBalance = () => setOverlay('setBalance')
  const openAddSpend = () => {
    if (!ledger.hasBalance) {
      setOverlay('setBalance')
      return
    }
    setOverlay('addSpend')
  }

  return (
    <div className="app-root">
      <aside className="desktop-blurb">
        <p className="blurb-brand">{appMeta.stageName}</p>
        <h1>{appMeta.tagline}</h1>
        <p>
          A companion tracker for parents and carers. Check balance by phone (
          {appMeta.phone}) or cashpoint, enter it here, then log spends. Local
          storage only — no live card API.
        </p>
        <p className="blurb-disclaimer">{appMeta.disclaimer}</p>
        {!syncConfigured && (
          <div className="dev-note" role="note">
            <strong>Sync not configured.</strong> Add{' '}
            <code>VITE_SUPABASE_URL</code> and <code>VITE_SUPABASE_ANON_KEY</code>{' '}
            (see <code>.env.example</code>). Local ledger still works for this
            alpha.
          </div>
        )}
        {syncConfigured && user?.email && (
          <p className="blurb-sync">Signed in as {user.email}</p>
        )}
        <button
          type="button"
          className="btn btn-ghost desktop-reset"
          onClick={() => {
            if (window.confirm('Clear all tracked data?')) ledger.resetAll()
            setOverlay('none')
            setTab('home')
          }}
        >
          Clear alpha data
        </button>
      </aside>

      <PhoneFrame>
        {!syncConfigured && (
          <div className="sync-banner" role="note">
            Sync not configured — local only. See .env.example
          </div>
        )}
        {overlay === 'setBalance' ? (
          <SetBalanceScreen
            ledger={ledger}
            onDone={() => {
              setOverlay('none')
              setTab('home')
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
                  syncConfigured={syncConfigured}
                  signedInEmail={user?.email ?? null}
                  signedInUserId={user?.id ?? null}
                  isAdmin={isAdmin}
                  onUpdateBalance={openSetBalance}
                  onReset={() => {
                    ledger.resetAll()
                    setTab('home')
                  }}
                  onSignOut={
                    syncConfigured
                      ? async () => {
                          await signOut()
                        }
                      : undefined
                  }
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
  )
}

function AppGate() {
  const { configured, loading, session } = useAuth()

  if (!configured) {
    return <MainApp syncConfigured={false} userId={null} />
  }

  if (loading) {
    return (
      <div className="app-root">
        <PhoneFrame>
          <div className="screen auth-screen auth-loading">
            <p className="app-kicker">{appMeta.stageName}</p>
            <p className="panel-text">Checking sign-in…</p>
            <p className="muted-note">{appMeta.disclaimer}</p>
          </div>
        </PhoneFrame>
      </div>
    )
  }

  if (!session) {
    return (
      <div className="app-root">
        <aside className="desktop-blurb">
          <p className="blurb-brand">{appMeta.stageName}</p>
          <h1>{appMeta.tagline}</h1>
          <p>
            Sign in to sync your ledger. Card balance checks still use phone (
            {appMeta.phone}) or cashpoint — no live card API.
          </p>
          <p className="blurb-disclaimer">{appMeta.disclaimer}</p>
        </aside>
        <PhoneFrame>
          <AuthScreen />
        </PhoneFrame>
      </div>
    )
  }

  return <MainApp syncConfigured userId={session.user.id} />
}

export default function App() {
  return (
    <AuthProvider>
      <AppGate />
    </AuthProvider>
  )
}
