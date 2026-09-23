import { allowedFoods, helpTips, appMeta, trialTesterBlurb } from '../data/helpContent';
import { DisclaimerBadge } from '../components/DisclaimerBadge';

export function HelpScreen() {
  return (
    <div className="screen help-screen">
      <header className="screen-header">
        <div>
          <p className="app-kicker">Guidance</p>
          <h1 className="screen-title">Help</h1>
        </div>
        <DisclaimerBadge />
      </header>

      <section className="help-section trial-blurb" aria-label={trialTesterBlurb.title}>
        <h2 className="panel-title">{trialTesterBlurb.title}</h2>
        <p className="panel-text">{trialTesterBlurb.body}</p>
      </section>

      <section className="help-section">
        <h2 className="panel-title">What you can buy</h2>
        <ul className="food-list">
          {allowedFoods.map((item) => (
            <li key={item.title} className="food-item">
              <strong>{item.title}</strong>
              <span>{item.detail}</span>
            </li>
          ))}
        </ul>
      </section>

      {helpTips.map((tip) => (
        <section key={tip.title} className="help-section">
          <h2 className="panel-title">{tip.title}</h2>
          <p className="panel-text">{tip.body}</p>
        </section>
      ))}

      <section className="help-section">
        <h2 className="panel-title">Official information</h2>
        <p className="panel-text">
          For real eligibility and card issues, visit{' '}
          <a href={appMeta.officialSite} target="_blank" rel="noopener noreferrer">
            healthystart.nhs.uk
          </a>
          . Balance line: {appMeta.phone}.
        </p>
        <p className="muted-note" style={{ marginTop: 10 }}>
          {appMeta.disclaimer}. Data stays on this device.
        </p>
      </section>
    </div>
  );
}
