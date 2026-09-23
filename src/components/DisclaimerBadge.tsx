import { appMeta } from '../data/helpContent';

export function DisclaimerBadge() {
  return (
    <div className="disclaimer-badge" role="note">
      {appMeta.disclaimer}
    </div>
  );
}
