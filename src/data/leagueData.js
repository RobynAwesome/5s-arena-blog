export const leagues = [
  {
    id: 1,
    name: "Monday Night League",
    day: "Monday",
    time: "7pm - 10pm",
    level: "Competitive",
    price: "R800",
    teamsRegistered: 8,
    totalSlots: 10,
    startDate: "7 April 2026",
    accent: "green",
  },
  {
    id: 2,
    name: "Wednesday Social League",
    day: "Wednesday",
    time: "6pm - 9pm",
    level: "Social / Mixed",
    price: "R600",
    teamsRegistered: 6,
    totalSlots: 10,
    startDate: "9 April 2026",
    accent: "cyan",
  },
  {
    id: 3,
    name: "Saturday Morning League",
    day: "Saturday",
    time: "9am - 12pm",
    level: "All Levels",
    price: "R700",
    teamsRegistered: 10,
    totalSlots: 10,
    startDate: "12 April 2026",
    accent: "yellow",
  },
];

export const standings = [
  {
    pos: 1,
    team: "West Coast Warriors",
    p: 14,
    w: 11,
    d: 2,
    l: 1,
    gf: 42,
    ga: 14,
  },
  {
    pos: 2,
    team: "Parklands United",
    p: 14,
    w: 10,
    d: 2,
    l: 2,
    gf: 38,
    ga: 18,
  },
  { pos: 3, team: "Table Bay FC", p: 14, w: 9, d: 3, l: 2, gf: 35, ga: 19 },
  { pos: 4, team: "Milnerton FC", p: 14, w: 7, d: 4, l: 3, gf: 29, ga: 22 },
  {
    pos: 5,
    team: "Blouberg Strikers",
    p: 14,
    w: 6,
    d: 3,
    l: 5,
    gf: 25,
    ga: 24,
  },
  { pos: 6, team: "Cape Crusaders", p: 14, w: 4, d: 3, l: 7, gf: 20, ga: 30 },
  {
    pos: 7,
    team: "Durbanville Dynamos",
    p: 14,
    w: 2,
    d: 4,
    l: 8,
    gf: 16,
    ga: 33,
  },
  { pos: 8, team: "Bellville City", p: 14, w: 1, d: 1, l: 12, gf: 10, ga: 45 },
];

export const faqItems = [
  {
    q: "How long are matches?",
    a: "Each match consists of two 20-minute halves with a 5-minute half-time break.",
  },
  {
    q: "What if we can't make a week?",
    a: "Teams can request a reschedule up to 48 hours before the match. Otherwise the fixture will count as a forfeit (0-3 loss).",
  },
  {
    q: "Can individuals join without a team?",
    a: "Yes! Contact us and we'll help match you with a team looking for players.",
  },
  {
    q: "When is the registration deadline?",
    a: "Registration closes one week before each league's start date. Payment must be received in full before the first match.",
  },
];

export const accentStyles = {
  green: {
    border: "rgba(34,197,94,0.3)",
    bg: "rgba(34,197,94,0.08)",
    text: "#22c55e",
    dot: "#22c55e",
    glow: "rgba(34,197,94,0.15)",
  },
  cyan: {
    border: "rgba(6,182,212,0.3)",
    bg: "rgba(6,182,212,0.08)",
    text: "#06b6d4",
    dot: "#06b6d4",
    glow: "rgba(6,182,212,0.15)",
  },
  yellow: {
    border: "rgba(234,179,8,0.3)",
    bg: "rgba(234,179,8,0.08)",
    text: "#eab308",
    dot: "#eab308",
    glow: "rgba(234,179,8,0.15)",
  },
};
