import { AlphaAdminPanel } from '../components/AlphaAdminPanel'
import { DisclaimerBadge } from '../components/DisclaimerBadge'

export function AdminScreen({ selfUserId }: { selfUserId: string | null }) {
  return (
    <div className="screen admin-screen">
      <header className="screen-header">
        <div>
          <p className="app-kicker">StartBalance</p>
          <h1 className="screen-title">Admin</h1>
        </div>
        <DisclaimerBadge />
      </header>
      <AlphaAdminPanel selfUserId={selfUserId} />
    </div>
  )
}
