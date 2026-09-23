export const appMeta = {
  name: 'StartBalance',
  tagline: 'Track your Healthy Start card balance',
  disclaimer: 'Trial app · not affiliated with NHS',
  officialSite: 'https://www.healthystart.nhs.uk',
  phone: '0118 338 5810',
};

export const allowedFoods = [
  { title: 'Cow’s milk', detail: 'Plain cow’s milk (whole or semi-skimmed).' },
  { title: 'Infant formula', detail: 'First infant formula based on cow’s milk.' },
  {
    title: 'Fruit & vegetables',
    detail: 'Fresh, frozen or tinned fruit and veg (no added sugar, salt or fat).',
  },
  {
    title: 'Pulses',
    detail: 'Dried, tinned or frozen lentils, beans, peas and chickpeas.',
  },
];

export const helpTips = [
  {
    title: 'How this app works',
    body: 'StartBalance does not connect to your card. Check the real balance by phone or cashpoint, then enter it here. Log spends as you shop so the remaining amount stays useful between checks.',
  },
  {
    title: 'Split payments',
    body: 'If your shop is more than your balance, ask the cashier to split the payment — Healthy Start first, then another card or cash for the rest.',
  },
  {
    title: 'Cashpoint balance tip',
    body: 'You can check your balance at a cashpoint (ATM) that shows “Balance enquiry”. No money is taken for a balance check.',
  },
  {
    title: 'Phone balance line',
    body: `The freephone balance line is ${appMeta.phone}. Use official channels for real account changes.`,
  },
];

/** Short blurb for friends/family trying the trial build. */
export const trialTesterBlurb = {
  title: 'For trial testers',
  body: 'Check your real Healthy Start balance by phone (0118 338 5810) or at a cashpoint, then tap Enter balance and type that amount. After shopping, tap Log a spend so the remaining figure stays useful. Data stays on this phone only — not linked to NHS.',
};
